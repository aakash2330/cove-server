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
        // console.log(item.productTitle);
        // console.log(item.quantity);
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
      success_url: `${CLIENT_URL}/cart?checkout-success=true`,
      cancel_url: `${CLIENT_URL}/cart`,
    });

    // console.log('Checking the stripe session: ', session);
    res.json({ url: session.url });
  } catch (e) {
    console.error('Error creating checkout session:', e);
    res.status(500).json({ error: 'Error creating checkout session' });
  }
});

module.exports = router;