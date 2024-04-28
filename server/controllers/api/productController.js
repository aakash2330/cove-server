const Product = require('../../models/Product');
const router = require('express').Router();

// Get all products
//I'm planning to name the home page home because '/' will bring me to the animation advert page

//Getting Product based the title clicked.
router.get( '/:productId', async (req, res) => {
    const singleProduct = req.params.productId;
    try{
        const product = await Product.findOne({ productId: singleProduct }).populate('comments');

        if(!product) {
            return res.status(404).json({ error: 'Product not found'});
        }
        res.json(product);
        // console.log(product);
    } catch (error) {
        console.error('Error catching single product: ', error);
        res.status(500).json({ error: 'Could not fetch single product'});
    }
});

//Getting Products based on category
router.get('/category/:category', async (req, res) => {
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

router.get('/sale/:sale', async (req, res) => {
    const productSale = req.params.sale;
    try{
        const product = await Product.find({ sale: productSale });
        if(product.length === 0) {
            return res.status(404).json({ error: 'Product not found'});
        }
        //If the product is true for sale then return product
            res.json(product);

    } catch (error) {
        res.status(500).json({ error: 'Could not fetch all products'});
    }
});

module.exports = router;