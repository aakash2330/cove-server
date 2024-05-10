const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const PORT =process.env.PORT || 3001;
const app = express();
const appOrigin = process.env.CLIENT_URL || process.env.VERCEL_URL;
const mongo = require('./config/connection');
const MongoStore = require('connect-mongo')(session);

// Enable CORS 
app.use(cors({
    origin: appOrigin, // Using cors on localhost 3000 so it can talk to 3001 or on vercel
    methods: ["POST", "GET", "UPDATE", "DELETE"],
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  }));
  
//Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 30,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongo,
        collection: 'sessions', // Specify the collection name for sessions
      }),
}));


//Middleware to parse JSON
app.use(express.json());

//Middleware for parsing urlencoded form data
app.use(express.urlencoded({extended: false }));

//Middleware for parsing cookies
app.use(cookieParser());

// Serve static files from the build folder (where react would create static files)
app.use(express.static(path.join(__dirname, '../build')));

// Serve static files from the 'public' folder (for other static files)
app.use(express.static(path.join(__dirname, '../public')));
//as
//Using the controller routes
app.use(require('./controllers'));

// Catch-all route for serving the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//Setting up the server
app.listen(PORT, () => {
    console.log(`App Listening at PORT http://localhost:${PORT} !`);
});
module.exports=app
