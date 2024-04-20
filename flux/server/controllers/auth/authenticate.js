const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
// const { Logout }= require('../../../src/components/Logout');

const { authenticate, secretKey } = require('../../middleware/Auth');


//Register a new user
router.post('/register', async (req, res, next) => {
    let logoutOnExpire;
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        //Trying to auto-log you in
        console.log('User Created!');
        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: '1 hour'
        });

        res.cookie('token', token, {
            expires: new Date(Date.now() + 604800000), // Cookie expires in 7 days
            httpOnly: true, // Cookie only accessible by the server
            secure: true, // Cookie is only sent over on HTTPs
            sameSite: 'strict' // Prevent CSRF attacks
        });

        if(token.exp) {
            logoutOnExpire = true;
        }

        //Getting the username and the token 
        res.json({
            message: 'Account Created!',
            token,
            username,
            logoutOnExpire
        });

    } catch (error) {
        next(error);
    }
});

//Login with an existing user
router.post('/login', async (req, res, next) => {
    let logoutOnExpire;
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid username or email. Please try again.' });
        }

        console.log('User Found: ', user);

        const passwordMatch = await user.comparePassword(password);
        console.log('Password Match: ', passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        //Saving the userid as userId to be used later
        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: '1 hour'
        })

        res.cookie('token', token, {
            expires: new Date(Date.now() + 604800000), // 7 days in millisec (7 x 24 x 60 x 60 x 1000)
            httpOnly: true, // Cookie only accessible by the server
            secure: true, // Cookie is only sent over on HTTPs
            sameSite: 'strict' // Prevent CSRF attacks
        });

        if(token.exp) {
            logoutOnExpire = true;
        }

        res.json({ token, username: user.username, logoutOnExpire });

    } catch (error) {
        next(error);
    }
});

//Middleware to ensure authenticated access
router.use(authenticate);

module.exports = router;