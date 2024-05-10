const router = require('express').Router();


const userRoutes = require('./userController');
const authRoutes = require('./authenticate');
const stripeRoutes = require('./stripe');


//Added this route to fix the issue with the route not being found
router.use('/user', userRoutes);
router.use('/verify', authRoutes);
router.use('/payment', stripeRoutes);


module.exports = router;