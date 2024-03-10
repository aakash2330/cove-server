const mongoose = require('mongoose');
const { Product } = require('../models/Product');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');

const commentData = require('./commentData.json');
const productData = require('./productData.json');
const userData = require('./userData.json');

//Seeding function
const seedDB = async () => {
   
    try{
      await mongoose.connect('mongodb://localhost:27017/fluxDB');
        console.log('Successfully connected to the database!!!');
        
        //Directly registering the models here.
        const Comment = mongoose.model('comment');
        const Product = mongoose.model('product');
        const User = mongoose.model('user');

        //deleting from the database
        await Comment.deleteMany({});
        console.log('Comments Deleted');
        await Product.deleteMany({});
        console.log('Products Deleted');
        await User.deleteMany({});
        console.log('Users Deleted');

        //Adding to the database
        await Comment.insertMany(commentData);
        console.log('Comments Added');
        await Product.insertMany(productData);
        console.log('Products Added');
        await User.insertMany(userData);
        console.log('Users Added');

        console.log('Database seeded!');
    } catch(error){
        console.error('Error seeding the database: ', error);
    } finally {
        mongoose.connection.close();
        console.log('Closing connection...');
    }
};

seedDB();
