const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  });

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  recipients: [recipientSchema],
  creatorID: {
    type: String,
    require: true,
  },
  postID: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // expires: 5,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
