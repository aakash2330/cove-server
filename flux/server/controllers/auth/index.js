const router = require('express').Router();


const userRoutes = require('./userController');
const authRoutes = require('./authenticate');


//Added this route to fix the issue with the route not being found
router.use('/user', userRoutes);
router.use('/verify', authRoutes);


module.exports = router;