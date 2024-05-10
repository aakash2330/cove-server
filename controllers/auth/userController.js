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
        // console.log('The User ID: ', userId);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cart = user.cart; // Access the user's cart field

        if (!cart || cart.length === 0) {
            // console.log('User cart is empty');
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
    const { productId, img, title, price, size, quantity, username } = req.body; //Extracting product information from
    // console.log('Product ID in route:', productId);
    // console.log('IMG in route:', img);
    // console.log('title in route:', title);
    // console.log('Price in route:', price);
    // console.log('Size in route:', size);
    // console.log('Quantity in route:', quantity);
    // console.log('username in route:', username);
    // Extract productId from req.body
    const isProductIdANum = req.body.productId;
    // console.log('Type of productId:', typeof isProductIdANum);

    //Price being manipulated below
    let newPrice;

    // Check if they exist, I don't want to go further if they don't
    if (!productId || !img || !title || !price || !size || !quantity || !username) {
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
        const existingSize = user.cart.find(item => item.productSize === parseInt(size));

        if (existingCartItem && existingSize) {
            //Changing the quantity value instead of adding another object
            // console.log('Existing item found!: ', existingCartItem);
            //Storing the original price 
            const originalPrice = existingCartItem.productPrice / existingCartItem.quantity;
            // console.log('Original Price: ', originalPrice);

            //updating the quantity
            existingCartItem.quantity = quantity;
            // console.log('Quantity: ', quantity);

            //Price Based on Quantity
            newPrice = originalPrice * quantity;
            // console.log('New Price: ', newPrice)

            existingCartItem.productPrice = newPrice;
        } else {
            // Adding the product to the cart
            const productPrice = price * quantity;
            user.cart.push({ productId, productImage: img, productTitle: title, productPrice: productPrice, productSize: size, quantity: quantity });
        }
        await user.save();

        // res.status(201).json({ message: 'Product added successfully to cart' });
        //Testing to see if returning the updated data will work instead of a status
        const cart = user.cart;
        res.json(cart);
    } catch (error) {
        console.error('Error adding to cart: ', error.message);
        res.status(500).json({ error: 'Could not add to cart' });
    }
});


router.delete('/deleteOneCart', authenticate, async (req, res) => {
    try {
        //Retrieving the users id from authenticated request
        const userId = req.user._id
        // console.log('The User ID: ', userId);
        const user = await User.findById(userId);

        // console.log('Checking for Request Body: ', req.body);
        const { cartId } = req.body; // extracting the cart Id from req.body
        // console.log('Checking value of cartId: ', cartId);
        // console.log('Checking type of cartId: ', typeof cartId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        //Check for existing cart item
        //Converting the object to string so that we can use the strict equal type
        const cartIndex = user.cart.findIndex(cart => cart._id.toString() === cartId);
        // console.log('Looking at the carts index: ', cartIndex);

        if (cartIndex >= 0) {
            user.cart.splice(cartIndex, 1);
        }

        await user.save();
        // const cart = user.cart;

        res.status(201).json({ message: 'Product added deleted from cart' });
        // res.json(cart);
    } catch (error) {
        console.error('Error deleting from cart: ', error.message);
        res.status(500).json({ error: 'Could not delete from cart' });
    }
});

// Delete stripe information after the url is accessed
router.delete('/remove-checkout', authenticate, async (req, res) => {
    try {
            const userId = req.user._id
            // console.log('The User ID: ', userId);
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const cart = user.cart; // Access the user's cart field

            if (!cart || cart.length === 0) {
                return res.status(200).json({ message: 'User cart is empty' });
            }

            // If the cart is not empty, delete all data
            cart.splice(0, cart.length);

            // Saving the deleted information to the database
            await user.save();
        
            res.status(201).json({ message: 'Products deleted after checkout' });
    } catch (err) {
        console.error('Error handling webhook:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

module.exports = router;
