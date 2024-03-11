const router = require('express').Router();
const authenticate = require('../../middleware/Auth');

router.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

module.exports = router;