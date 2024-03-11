const router = require('express').Router();


const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const authRoutes = require('./auth');

router.use('/home', homeRoutes);
router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

module.exports = router;