//Destructuring and getting schema and types from Mongoose documentation
const { Schema, Types, model } = require('mongoose');


//Schema to create a Post model
const commentSchema = new Schema({
    productId: { type: Number, required: true },
    userId: { type: Number, required: true },
    commentDescription: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    //each comment is associated with a single user
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    //each comment is associated with a single product
    product: { type: Schema.Types.ObjectId, ref: 'Product'}
},
{
    toJSON: {
        getters: true,
    },
});

//Initializing the Comment Model
const Comment = model('Comment', commentSchema);

module.exports = Comment;