//Importing mongoose packages for connection
require('dotenv').config(); // imported to load env variables
// const uri = process.env.MONGODB_URI;
const uri = process.env.MONGODB_LOCAL; // testing with localhost for development
const mongoose = require('mongoose');

//Handling the different connection events
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('MongoDB opened');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Closing the connection when the application is exited
process.on('SIGINT', () => {
    db.close();
        console.log('Mongoose connection is disconnected due to application termination');
        process.exit(0);
});

//Connect to the database
mongoose.connect(`${uri}`);

module.exports = db;