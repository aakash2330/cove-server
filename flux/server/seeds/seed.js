const { connection } = require('mongoose');
const { Product } = require('../models/Product');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');

const commentData = require('./commentData.json');
const productData = require('./productData.json');
const userData = require('./userData.json');

//Seding function
const seedDB = async () => {
    try{
        await Comment.deleteMany({});
        await Comment.insertMany(commentData);
        await Product.deleteMany({});
        await Product.insertMany(productData);
        await User.deleteMany({});
        await User.insertMany(userData);
        console.log('Database seeded!');
    } catch(error){
        console.error('Error seeding the database: ', error);
    } finally {
        // Close connection to DB after seeding is complete
        connection.close(() => {
            console.log('Database closed after seed.');
        });
    }
};

seedDB();
