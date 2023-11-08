const mongoose = require('mongoose');
const Notification = require('../Models/notifications');
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/getNotifications', async (req, res) => {

  const authResponse = await axios.post('http://host.docker.internal/users/authenticate', {
    headers: req.headers, // Pass the token received in the request headers
  });

  const userID = new mongoose.Types.ObjectId(authResponse.data.id);

  try {
    const notifications = await Notification.find({ 'recipients.user': userID }).sort({ createdAt: -1 });

    res.json({notifications: notifications});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
});

router.post('/setSeen', async (req, res) => {
  const notificationID = req.body.notificationID;
  const userID = new mongoose.Types.ObjectId(req.body.userID);

  console.log(notificationID, userID);

  try {
    const notification = await Notification.findOne({ _id: notificationID })

    notification.recipients.map((user) => {
      if (user.user.equals(userID)) {
        user.seen = true;
      }
    });

    await notification.save();

    res.json({ message: 'Notfication seen' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
});


router.post('/createNotification', async (req, res) => {
  try {
    const notificationData = req.body;

    const notification = new Notification(notificationData);
    await notification.save();

    console.log('Notification created and saved successfully.');

    res.json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create and save the notification.' });
  }
});

module.exports = router;