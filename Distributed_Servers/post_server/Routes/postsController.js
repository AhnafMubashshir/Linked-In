const Post = require('../Models/posts');
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/getPosts', async (req, res) => {

    try {
        const authResponse = await axios.post('http://host.docker.internal/users/authenticate', {
            headers: req.headers,
        });
        const posts = await Post.find({ creatorID: { $ne: authResponse.data.id } }).sort({ createdAt: -1 });

        console.log(authResponse.data);
        console.log(posts);

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
    const images = req.body.allURL;
    const seen = false;

    try {
        const authResponse = await axios.post('http://host.docker.internal/users/authenticate', {
            headers: req.headers, // Pass the token received in the request headers
        });

        console.log(authResponse.data);
        const post = new Post({
            body: postInfo.postBody,
            creatorID: authResponse.data.id,
            creator: authResponse.data.userName,
            images: images,
            userImage: authResponse.data.image,
        });

        await post.save();

        console.log('Post created succesfully');

        const userResponse = await axios.post('http://host.docker.internal/users/findUserExceptCreator', {
            _id: { $ne: authResponse.data.id }
        });

        const allUsersExceptCreator = userResponse.data.allUsersExceptCreator;

        const maxBodyLength = 100;
        const truncatedBody = post.body.length > maxBodyLength
            ? post.body.slice(0, maxBodyLength) + '...'
            : post.body;
        const notificationMessage = `New post: ${truncatedBody} created by: ${authResponse.data.userName}.`;

        const notificationRecipients = allUsersExceptCreator.map(user => ({
            user: user._id,
            seen: seen,
        }));

        console.log('Recipients: ',notificationRecipients);

        const notificationConfirmation = await axios.post('http://host.docker.internal/notifications/createNotification', {
            message: notificationMessage,
            recipients: notificationRecipients,
            postID: post._id,
            creatorID: authResponse.data.id,
            creatorImage: authResponse.data.image,
        });

        console.log(notificationConfirmation.data.message);

        res.json(post);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;