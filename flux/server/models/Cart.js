//Destructuring and getting schema and types from Mongoose documentation
const { Schema, Types } = require('mongoose');
const User = require('./User');
const Product = require('./Product');

//Schema to create a Post model
const cartSchema = new Schema({
    //each user can have one active shopping cart
    user: { type: Types.ObjectId, ref: 'User'},
    //each shopping cart can contain multiple products
    products: [{ type: Types.ObjectId, ref: 'Product'}]
},
{
    toJSON: {
        getters: true,
    },
});


module.exports = cartSchema;