const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secretKey = process.env.JWT_SECRET;
//Handling authentication middleware

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if(!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try{
    const decodedToken = jwt.verify(token, secretKey);
    console.log('Decoded Token:', decodedToken);
    
    //userId was how the _id was saved when creating the token on login
    const user = await User.findById(decodedToken.userId);

    console.log('Found User:', user);

    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Adding the user object for future requests
    req.user = user;
    console.log('User Object: ', user);
    next();

  } catch(error) {
    console.error('Error in authentication:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = {authenticate, secretKey }; 
  