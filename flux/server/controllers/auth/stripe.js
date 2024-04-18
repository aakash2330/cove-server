const router = require('express').Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//Need to change this from localhost after deployment
const CLIENT_URL = process.env.CLIENT_URL;

router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], 
      line_items: req.body.items.map(item => {
        console.log(item.productTitle);
        console.log(item.quantity);
        return {
          price_data: {
            currency: 'usd',
            //Stripe deals with prices in cents so this will transform it back to its original price
            unit_amount: item.productPrice * 100,
            product_data: {
              name: item.productTitle,
              description: `Size: ${item.productSize}`,
              // images: [`${CLIENT_URL}/${item.productImage}`],
            },
          },
          quantity: item.quantity,
        }
      }),
      mode: 'payment',
      success_url: `${CLIENT_URL}/checkout-success`,
      cancel_url: `${CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;