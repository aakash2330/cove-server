const { connectToDB } = require('../config/connection');
const { Product } = require('../models/Product');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');

const commentData = require('./commentData.json');
const productData = require('./productData.json');
const userData = require('./userData.json');

//Seeding function
const seedDB = async () => {
    await connectToDB();
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
    } 
};

seedDB();
