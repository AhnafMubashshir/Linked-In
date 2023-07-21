const User = require('../Models/users');
const UserService = require('../Services/userService');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/createUser', async (req, res) => {
    const userInfo = req.body.values;
    try {
        const hashedPassword = UserService.generateHashPassword(userInfo.password);
        const isMatch = bcrypt.compareSync(userInfo.password, hashedPassword);

        if (isMatch) {
            const user = new User ({
                name: userInfo.name,
                email: userInfo.email,
                password: hashedPassword,
                age: userInfo.age
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
    try {

        const user = await User.findOne({
            where: {email: req.body.email},
            attributes: [_id, password],
        })

        if (user) {
            const userID = user._id;
            const hashedPassword = user.password;
            const isMatch = bcrypt.compareSync(req.body.password, hashedPassword);
    
            if (isMatch) {
                return res.send({ sign: true, userID });
            } else {
                return res.send({ sign: false, error:'Wrong password. Try again!' });
            }
        } else {
            return res.send({ sign: false, error: `Email doesn't exist` });
        }
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;