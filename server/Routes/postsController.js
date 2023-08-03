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
        const post = await Post.findOne({ _id: postID });

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
    const images = req.body.allURL;
    const seen = false;

    try {
        const creator = await User.findOne({ _id: userID });
        console.log(creator);

        const post = new Post({
            body: postInfo.postBody,
            creatorID: userID,
            creator: creator.name,
            images: images,
            userImage: creator.image,
        });

        await post.save();

        console.log('Post created succesfully');

        const allUsersExceptCreator = await User.find({ _id: { $ne: userID } });
        
        const maxBodyLength = 100; // Choose an appropriate value based on your requirements
        const truncatedBody = post.body.length > maxBodyLength
            ? post.body.slice(0, maxBodyLength) + '...'
            : post.body;
        const notificationMessage = `New post: ${truncatedBody} created by: ${creator.name}.`;

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
            creatorImage: creator.image,
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