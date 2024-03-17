const router = require('express').Router();
const authenticate = require('../../middleware/Auth');
const User = require('../../models/User');

router.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

//Get all the existing products in the cart and displaying it
router.get('/cart', authenticate, async (req, res) => {
    try {
        //Retrieving the users id from authenticated request
        const userId = req.user._id
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cart = user.cart; // Access the user's cart field

        if (!cart || cart.length === 0) {
            console.log('User cart is empty');
            return res.status(200).json({ message: 'User cart is empty' });
        }

        // If the cart is not empty, return the cart data
        res.json(cart);

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: `Could not fetch user products. ${error.message}` });
    }
});

//Post new products to the users cart
router.post('/addCart', authenticate, async (req, res) => {
    const { productId, img, title, newPrice, username } = req.body; //Extracting product information from
    console.log('Product ID in route:', productId);
    console.log('IMG in route:', img);
    console.log('title in route:', title);
    console.log('Price in route:', newPrice);

    // Check if they exist, I don't want to go further if they don't
    if (!productId || !img || !title || !newPrice || !username) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        //Querying the username field in the user collection
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        //Adding the product to the cart
        user.cart.push({ productId, img, title, newPrice });
        await user.save();

        res.status(201).json({ message: 'Product added successfully to cart' });
    } catch (error) {
        console.error('Error adding to cart: ', error.message);
        res.status(500).json({ error: 'Could not add to cart' });
    }
});

module.exports = router;