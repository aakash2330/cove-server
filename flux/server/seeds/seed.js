// const {connect} = require('mongoose');
const { Product, User, Comment } = require('../models');

const commentData = require('./commentData.json');
const productData = require('./productData.json');
const userData = require('./userData.json');

const seedDB = async () => {
    try{
        await Comment.deleteMany({});
        await Comment.insertMany(commentData);
        await Product.deleteMany({});
        await Product.insertMany(productData);
        await User.deleteMany({});
        await User.insertMany(userData);
    } catch(error){
        console.error('Error seeding the database: ', error);
    }
};

seedDB();
//Not sure If I want to close the connection after I seed the database yet
// seedDB().then(() => {
//     connect.close();
// })