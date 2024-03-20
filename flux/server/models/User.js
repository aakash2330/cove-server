//Destructuring and getting schema and types from Mongoose documentation
const { Schema, Types, model } = require('mongoose');
//For a secure password
bcrypt = require('bcrypt');
//This is to increase the amount of hashing of the password
SALT_WORK_FACTOR = 10;

//Schema to create a Post model
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
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
    },
    //Each user has a cart that can store multiple products
    cart: [{
        productId: { type: Number, ref: 'Product' },
        quantity: {type: Number, default: 1 }
    }],
},
    {
        toJSON: {
            getters: true,
        },
    });

    //Using .pre method to define middleware (hashing before info enters the db)
userSchema.pre('save', async function (next) {
    console.log('Save middleware registered!!');
    const user = this;
    console.log('Is password modified?', user.isModified('password')); // Log if the password is modified
    console.log('User password:', user.password); // Log the user's password before hashing
    //Only perform hashing if a password is present
    if(!user.isModified('password') || !user.password) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        user.password = await bcrypt.hash(user.password, salt);
        console.log('Hashed password: ', user.password);

        return next();
    }catch(error) {
        return next(error);
    }
});

//Comparing the given password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//Initializing the User Model
const User = model('User', userSchema);

module.exports = User;