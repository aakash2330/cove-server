//Destructuring and getting schema and types from Mongoose documentation
const { Schema, Types, model } = require('mongoose');
const User = require('./User');
const Product = require('./Product');

//Schema to create a Post model
const commentSchema = new Schema({
    productId: { type: Number, required: true, auto: true },
    userId: { type: Number, required: true, auto: true },
    commentDescription: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    //each comment is associated with a single user
    user: { type: Number, ref: 'User'},
    //each comment is associated with a single product
    product: { type: Number, ref: 'Product'}
},
{
    toJSON: {
        getters: true,
    },
});

//Initializing the Comment Model
const Comment = model('comment', commentSchema);

module.exports = Comment;