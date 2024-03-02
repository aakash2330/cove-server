const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');

const PORT =process.env.PORT || 3001;

const app = express();

dotenv.config();

//Middleware to parse JSON
app.use(express.json());

//Middleware for parsing urlencoded form data
app.use(express.urlencoded({extend: false }));

//Session Middleware
app.use(session({
    secret
}))

//Setting up the server
app.listen(PORT, () => {
    console.log(`App Listening at PORT http://localhost:${PORT} !`);
});