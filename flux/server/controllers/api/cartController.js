const router = require('express').Router();
const { Cart, User, Product } = require('../models');

// Get all products
//I'm planning to name the home page home because '/' will bring me to the animation advert page
//Trying to get the image title and new price
router.getCartProducts('/cart', async (req, res) => {
    try{
        if(!req.isAuthenticated()) {
            console.log("User is not authenticated");
            res.status(401).json({error: 'Unauthorized'});
            return;
        } 

        //User Id from the authenticated user
        const userId = req.user._id;

        //Find the users cart based on their id
        const userCart = await Cart.findOne({user: userId});

        //Checking to see if the user has a cart
        if(!userCart){
            console.log("No items in the cart");
            res.json({message: "No items in the cart"});
            return;
        }

        //Getting the items associated with the users cart
        const products= await Product.find({_id: {$in: userCart.products}});
        res.json(products);

    } catch (error) {
        res.status(500).json({ error: 'Could not fetch all products'});
    }
});

// router.getProduct( async (req, res) => {
//     const productId = req.params.id;
//     try{
//         const product = await Product.findById(productId);
//         if(!product) {
//             return res.status(404).json({ error: 'Product not found'});
//         }
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ error: 'Could not fetch all products'});
//     }
// });