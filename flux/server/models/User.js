//Destructuring and getting schema and types from Mongoose documentation
const { Schema, Types } = require('mongoose');
const Product = require('./Product');
const Cart = require('./Cart');

//Schema to create a Post model
const userSchema = new Schema({
    username: { type: Types.ObjectId, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        //This is supposed to match a valid email using regex
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please Enter a valid Email Address!']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, 'Weak password'],
        maxLength: [16, 'Slow down, password too strong!']
    },
    //Each user can have multiple products
    products: [{ type: Types.ObjectId, ref: Product}],
    //each user has a single cart
    cart: { type: Types.ObjectId, ref: Cart}
},
    {
        toJSON: {
            getters: true,
        },
    });


module.exports = userSchema;