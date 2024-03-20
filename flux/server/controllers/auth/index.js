const router = require('express').Router();


const userRoutes = require('./userController');



router.use('/user', userRoutes);


module.exports = router;