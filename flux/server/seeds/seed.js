const { connectToDB } = require('../config/connection');
const { Product } = require('../models/Product');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');
const mongoose = require('mongoose');

const commentData = require('./commentData.json');
const productData = require('./productData.json');
const userData = require('./userData.json');

//Seeding function
const seedDB = async () => {
    await connectToDB();
    try{
        console.log('Successfully connected to the database!!!')
        await mongoose.model('comment').deleteMany({});
        console.log('Comments Deleted');
        await mongoose.model('comment').insertMany(commentData);
        console.log('Comments Added');
        await mongoose.model('product').deleteMany({});
        console.log('Products Deleted');
        await mongoose.model('product').insertMany(productData);
        console.log('Products Added');
        await mongoose.model('user').deleteMany({});
        console.log('Users Deleted');
        await mongoose.model('user').insertMany(userData);
        console.log('Users Added');
        console.log('Database seeded!');
    } catch(error){
        console.error('Error seeding the database: ', error);
    } 
};

seedDB();
