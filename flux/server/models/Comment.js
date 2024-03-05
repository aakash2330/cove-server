//Destructuring and getting schema and types from Mongoose documentation
const { Schema, Types } = require('mongoose');
const User = require('./User');
const Product = require('./Product');

//Schema to create a Post model
const commentSchema = new Schema({
    productId: { type: Types.ObjectId, required: true, auto: true },
    userId: { type: Types.ObjectId, required: true, auto: true },
    commentDescription: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    //each comment is associated with a single user
    user: { type: Types.ObjectId, ref: 'User'},
    //each comment is associated with a single product
    product: { type: Types.ObjectId, ref: 'Product'}
},
{
    toJSON: {
        getters: true,
    },
});


module.exports = commentSchema;