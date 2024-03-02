//Destructuring and getting schema and types from Mongoose documentation
const { Schema, Types } = require('mongoose');
const User = require('./User');
const Product = require('./Product');

//Schema to create a Post model
const cartSchema = new Schema({
    cartId: { type: Types.ObjectId, required: true, auto: true },
    img: String, //String is shorthand for {type: String}
    title: { type: String, required: true},
    description: String,
    prevPrice: Number,
    newPrice: { type: Number, required: true},
    company: String,
    color: String,
    category: String,
    //each user can have one active shopping cart
    user: { type: Types.ObjectId, ref: User},
    //each shopping cart can contain multiple products
    products: [{ type: Types.ObjectId, ref: Product}]
},
{
    toJSON: {
        getters: true,
    },
});


module.exports = cartSchema;