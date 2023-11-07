const User = require('../Models/users');
const UserService = require('../Services/userService');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const axios = require('axios');

const router = express.Router();

const authMiddleWare = require('../MiddleWare/authMiddleWare');
router.use('/authenticate', authMiddleWare.authenticate);

router.post('/register', async (req, res) => {
    const userInfo = req.body.values;
    const image = req.body.allURL[0];
    console.log(image);
    try {
        const hashedPassword = UserService.generateHashPassword(userInfo.password);
        const isMatch = bcrypt.compareSync(userInfo.password, hashedPassword);

        if (isMatch) {
            const user = new User({
                name: userInfo.name,
                email: userInfo.email,
                password: hashedPassword,
                age: userInfo.age,
                image: image,
            });

            await user.save();

            console.log("User created Succesfully.");

            res.json(user);
        }

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/login', async (req, res) => {
    const userInfo = req.body.values;
    try {
        const user = await User.findOne({
            email: userInfo.email
        });

        if (user) {
            const userID = user._id;
            const hashedPassword = user.password;
            const isMatch = bcrypt.compareSync(userInfo.password, hashedPassword);

            if (isMatch) {
                const accessToken = jwt.sign({
                    user: {
                        userName: user.name,
                        email: user.email,
                        id: userID,
                        image: user.image,
                        age: user.age,
                    }
                },
                    process.env.JWT_SECTET_KEY,
                );

                return res.send({ sign: true, token: accessToken, userID: userID });
            } else {
                return res.send({ sign: false, error: 'Wrong password. Try again!' });
            }
        } else {
            return res.send({ sign: false, error: `Email doesn't exist` });
        }

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/getUserInfo', async (req, res) => {
    try {
        const authResponse = await axios.post('http://localhost:6004/users/authenticate', {
            headers: req.headers, // Pass the token received in the request headers
        });

        const user = authResponse.data;

        res.json({ name: user.userName, email: user.email, age: user.age, image: user.image });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


router.post('/findUserExceptCreator', async (req, res) => {
    try {
        const creatorID = req.body._id;

        console.log(req.body);

        const allUsersExceptCreator = await User.find({ _id: creatorID });

        // console.log(allUsersExceptCreator);

        console.log('User details fetched successfully.');

        res.json({ allUsersExceptCreator: allUsersExceptCreator });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch user data.' });
    }
});

module.exports = router;