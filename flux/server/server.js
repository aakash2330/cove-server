const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

const PORT =process.env.PORT || 3001;
const app = express();

const mongo = require('./config/connection');

//Middleware to parse JSON
app.use(express.json());

//Middleware for parsing urlencoded form data
app.use(express.urlencoded({extend: false }));

//Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongo }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 30,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
}))

//Create static directory here!
app.use(express.static(path.join(__dirname, 'public')));

//Using the controller routes
app.use(require('./controllers/'));

//Setting up the server
app.listen(PORT, () => {
    console.log(`App Listening at PORT http://localhost:${PORT} !`);
});