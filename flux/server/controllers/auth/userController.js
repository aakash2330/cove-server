const router = require('express').Router();
const { authenticate } = require('../../middleware/Auth');
const User = require('../../models/User');

router.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

//Get all the existing products in the cart and displaying it
router.get('/cart', authenticate, async (req, res) => {
    try {
        //Retrieving the users id from authenticated request
        const userId = req.user._id
        console.log('The User ID: ', userId);
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
    console.log('username in route:', username);
    const isProductIdANum = req.body.productId; // Extract productId from req.body
console.log('Type of productId:', typeof isProductIdANum);

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

        //Check for existing cart item
        //The productId being produced from req.body is a string so we converted it back to int
        const existingCartItem = user.cart.find(item => item.productId === parseInt(productId));

        if (existingCartItem) {
            //Changing the quantity value instead of adding another object
            console.log('Existing item found!: ', existingCartItem);
            existingCartItem.quantity += 1;
        } else {
            //Adding the product to the cart
            user.cart.push({ productId, productImage: img, productTitle: title, productPrice: newPrice });
        }

        await user.save();

        res.status(201).json({ message: 'Product added successfully to cart' });
    } catch (error) {
        console.error('Error adding to cart: ', error.message);
        res.status(500).json({ error: 'Could not add to cart' });
    }
});

router.delete('/deleteAllCart', authenticate, async (req, res) => {
     try {
        //Retrieving the users id from authenticated request
        const userId = req.user._id
        console.log('The User ID: ', userId);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cart = user.cart; // Access the user's cart field

        if (!cart || cart.length === 0) {
            console.log('User cart is empty');
            return res.status(200).json({ message: 'User cart is empty' });
        }

        // If the cart is not empty, delete all data
        cart.splice(0, cart.length);

        // Saving the deleted information to the database
        await user.save();

    } catch (error) {
        console.error('Error deleting products:', error);
        res.status(500).json({ error: `Could not delete user products. ${error.message}` });
    }
});

router.delete('/deleteOneCart', authenticate, async (req, res) => {
    try {
       //Retrieving the users id from authenticated request
        const userId = req.user._id
        console.log('The User ID: ', userId);
        const user = await User.findById(userId);

        console.log('Checking for Request Body: ', req.body);
        const { productId } = req.body; // extracting the product Id from req.body
        console.log('Checking type of productId: ', typeof productId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        //Check for existing cart item
        const cartIndex = user.cart.findIndex(item => item.productId === productId);
        console.log('Looking at the carts index: ', cartIndex);

        if (cartIndex >= 0) {
            //Changing the quantity value instead of adding another object
            console.log('Existing index found!: ', cartIndex);
            if(user.cart[cartIndex].quantity > 1) {
                user.cart[cartIndex].quantity -= 1;
            } else {
                //Remove product by index from the cart
                user.cart.splice(cartIndex, 1);
            }
        } 

        await user.save();

        res.status(201).json({ message: 'Product added deleted from cart' });
    } catch (error) {
        console.error('Error deleting from cart: ', error.message);
        res.status(500).json({ error: 'Could not delete from cart' });
    }
});

module.exports = router;