const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const Comment = require('../models/Comment');

const commentData = require('./commentData.json');
const productData = require('./productData.json');
const userData = require('./userData.json');

//Seeding function
const seedDB = async () => {

    try {
        await mongoose.connect('mongodb://localhost:27017/fluxDB');
        console.log('Successfully connected to the database!!!');

        // Delete existing data
        await User.deleteMany({});
        console.log('Users Deleted');
        await Product.deleteMany({});
        console.log('Products Deleted');
        await Comment.deleteMany({});
        console.log('Comments Deleted');

        //Iterating through each user to make sure they are actually saving to the database
        //Im doing it this way to verify if the data is being saved correctly when im hashing the passwords
        for(const userObject of userData) {
            const newUser = new User(userObject);

            //Console log to check
            console.log("New User saving: ", newUser);

            //Save the new user
            await newUser.save();

            console.log('User Saved: ', newUser);
        }

        // Add new data
        await Product.insertMany(productData);
        console.log('Products Added');
        await Comment.insertMany(commentData);
        console.log('Comments Added');

        console.log('Database seeded!');
    } catch (error) {
        console.error('Error seeding the database: ', error);
    } finally {
        mongoose.connection.close();
        console.log('Closing connection...');
    }
};

seedDB();
