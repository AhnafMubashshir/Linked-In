var express = require('express');
var cors = require('cors');
const connectDB = require('./Database/db');

const PORT = 6002;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const NotificationController = require('./Routes/notificationsController');

app.use('/notifications', NotificationController);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});