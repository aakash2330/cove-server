const Comment = require('../../models/Comment');
const Product = require('../../models/Product');
const router = require('express').Router();

// Sending the information to the comment collection in the db
router.post('/newComment', async (req, res) => {
    const { username, newComment, productId } = req.body; //Extracting username and comments from the body
    console.log('Username in route:', username);
    console.log('Comment in route:', newComment);
    console.log('Product ID in route:', productId);

    try {
        const createdComment = await Comment.create({ 
            productId: productId,
            username: username ,
            commentDescription: newComment,
        });
        console.log('This is the new comment to be added: ', createdComment);
        res.status(201).json(createdComment); // Respond with the newly created comment
    } catch(error) {
        console.error('Error creating comment: ', error.message);
        res.status(500).json({ error: 'Could not create comment' });
    }
});

router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
    console.log('ProductId in route:', productId);
//If this works you can do this with the normal single product get and focus the comment
// routes for creating new comments. They don't need to be gotten they just need to be sent there
    try{
        const comments = await Comment.find({productId: productId});
        console.log('These are my comments for this product: ', comments);
        const product = await Product.findOne({productId: productId}).populate('comments');

        if(!comments) {
            return res.status(404).json({ error: 'Comment not found'});
        }

        //Putting both the product and the comments in the response
        const response = {
            product: product,
            comments: comments
        }

        res.json(response);
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        res.status(500).json({ error: 'Could not fetch any comments'});
    }
});

module.exports = router;