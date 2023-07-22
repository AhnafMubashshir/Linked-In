const Post = require('../Models/posts');
const express = require('express');
const router = express.Router();

router.post('/createPost', async (req, res) => {
    const postInfo = req.body.postValue;
    const userID = req.body.userID;

    try {
        const post = new Post ({
            title: postInfo.postTitle,
            body: postInfo.postBody,
            userID: userID,
        });

        await post.save();

        console.log('Post created succesfully');

        res.json(post);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;