const Post = require('../Models/posts');
const express = require('express');
const router = express.Router();

router.post('/createPost', async (req, res) => {
    console.log(req.body);

    try {
        const post = new Post ({
            title: req.body.title,
            body: req.body.body,
            userID: req.body.userID,
        });

        await post.save();

        res.json(post);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;