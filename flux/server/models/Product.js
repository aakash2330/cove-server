//Destructuring and getting schema and types from Mongoose documentation
const { Schema, Types, model } = require('mongoose');
const User = require('./User');
const Comment = require('./Comment');

//Schema to create a Post model
const productSchema = new Schema({
    productId: { type: Number, required: true, auto: true },
    img: String, //String is shorthand for {type: String}
    title: { type: String, required: true},
    description: String,
    prevPrice: Number,
    newPrice: { type: Number, required: true},
    company: String,
    color: String,
    category: String,
    //each product can have multiple users
    users: [{ type: Number, ref: 'User'}],
    //each product can have multiple comments
    comments: [{ type: Types.ObjectId, ref: 'Comment'}]
},
{
    toJSON: {
        getters: true,
    },
});

//Initializing the Product Model
const Product= model('product', productSchema);

module.exports = Product;