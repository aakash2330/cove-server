const { Product } = require('../models');
const router = require('express').Router();

// Get all products
//I'm planning to name the home page home because '/' will bring me to the animation advert page
//Trying to get the image title and new price
router.getAllComments('/api/comments/', async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch all products'});
    }
});

router.getProduct( async (req, res) => {
    const productId = req.params.id;
    try{
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).json({ error: 'Product not found'});
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch all products'});
    }
});

router.getProductCategory('/home/:category', async (req, res) => {
    const productCategory = req.params.category;
    try{
        const product = await Product.find({ category: productCategory });
        if(product.length === 0) {
            return res.status(404).json({ error: 'Product not found'});
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch all products'});
    }
});