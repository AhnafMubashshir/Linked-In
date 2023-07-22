const mongoose = require('mongoose');
const Notification = require('../Models/notifications');
const express = require('express');
const router = express.Router();

router.post('/getNotifications', async (req, res) => {
    const userID = new mongoose.Types.ObjectId(req.body.userID);
  
    try {
      const notifications = await Notification.find({'recipients.user': userID}).sort({ createdAt: -1 });
  
      res.json(notifications);
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
      const notification = await Notification.findOne({_id: notificationID})
  
      notification.recipients.map((user) => {
        if(user.user.equals(userID)) {
            user.seen = true;
        }
      });

      await notification.save();

      res.json({message: 'Notfication seen'});

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch notifications.' });
    }
  });

module.exports = router;