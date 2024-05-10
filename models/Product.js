//Destructuring and getting schema and types from Mongoose documentation
const { Schema, model } = require('mongoose');

//Schema to create a Post model
const productSchema = new Schema({
    productId: { type: Number, required: true, auto: true },
    img: String, //String is shorthand for {type: String}
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    company: String,
    color: String,
    category: String,
    sale: Boolean,
    //each product can have multiple users
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    //each product can have multiple comments
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
},
    {
        toJSON: {
            getters: true,
        },
    });

//Initializing the Product Model
const Product = model('Product', productSchema);

module.exports = Product;