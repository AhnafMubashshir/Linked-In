const Post = require('../Models/posts');
const User = require('../Models/users');
const Notification = require('../Models/notifications');
const express = require('express');
const router = express.Router();

router.get('/getPosts', async (req, res) => {

    try {
        const posts = await Post.find().sort({ createdAt: -1 });;

        console.log('All posts fetched');

        res.json(posts);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/getPostInfo', async (req, res) => {

    const postID = req.body.postID;

    try {
        const post = await Post.findOne({_id: postID});

        console.log(`post with _id: ${postID} fetched`);

        res.json(post);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


router.post('/createPost', async (req, res) => {
    const postInfo = req.body.postValue;
    const userID = req.body.userID;
    const seen = false;

    try {
        const creator = await User.findOne({ _id: userID });

        const post = new Post ({
            title: postInfo.postTitle,
            body: postInfo.postBody,
            userID: userID,
        });

        await post.save();

        console.log('Post created succesfully');

        const allUsersExceptCreator = await User.find({ _id: { $ne: userID } });
        const notificationMessage = `New post: ${post.title} created by: ${creator.name}.`;
        const notificationRecipients = allUsersExceptCreator.map(user => ({
            user: user._id,
            seen: seen,
          }));

        console.log(notificationRecipients);

        const notification = new Notification({
            message: notificationMessage,
            recipients: notificationRecipients,
            postID: post._id,
            creatorID: userID,
        });

        await notification.save();

        console.log('Notification sent succesfully.');

        res.json(post);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;