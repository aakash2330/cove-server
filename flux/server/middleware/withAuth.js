const withAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      // If the user is authenticated, proceed to the next middleware or route handler
      return next();
    }
  
    // If the user is not authenticated, redirect them to the login page or send an unauthorized response
    res.redirect('/login'); // Or res.status(401).json({ error: 'Unauthorized' });
  };
  
  module.exports = withAuth;
  