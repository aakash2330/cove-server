const router = require('express').Router();

const productRoutes = require('./productController');
const commentRoutes = require('./commentController');

router.use('/product', productRoutes);
router.use('/comment', commentRoutes);

module.exports = router;


