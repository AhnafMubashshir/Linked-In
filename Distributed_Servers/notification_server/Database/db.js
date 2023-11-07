// db.js
const mongoose = require('mongoose');
require('dotenv').config();
const Notification = require('../Models/notifications');

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.URL}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    Notification.collection.createIndex({ createdAt: 1 });

    setInterval(async () => {
      const deleteTime = new Date(Date.now() - 6*60*60*1000);
      await Notification.deleteMany({ createdAt: { $lt: deleteTime } });
    }, 100000);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDB;
