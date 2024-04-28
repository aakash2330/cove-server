const Product = require('../models/Product');
const router = require('express').Router();

//Getting all the products for the homepage
router.get('/shop', async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
        // console.log(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: `Could not fetch all products. ${error.message}`});
    }
});

module.exports = router;