//Importing mongoose packages for connection
//Using destructuring to get connect and connection from the mongoose library
const mongoose = require('mongoose');

//Instead of writing mongoose.connect we already attained connect from the mongoose docs
// const connectToDB = async () => {
//     connect('mongodb://localhost:27017/fluxDB').then(() => {
//         console.log('Initial connection to database');
//     }).catch((error) => {
//         console.error('Error connecting to MongoDB:', error.message);
//     });
// };

// connectToDB();

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
mongoose.connect('mongodb://localhost:27017/fluxDB');

module.exports = db;