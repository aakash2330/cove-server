module.exports = {
    //Ensuring authentication using express.js and passport.js
    ensureAuthenticated: function(req, res, next) {
        //If request is true it moves on to the next middleware authentication
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'User is not signed in');
        res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
}