var express = require('express');
var cors = require('cors');
const connectDB = require('./Database/db');

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const UserController = require('./Routes/usersController');
const PostController = require('./Routes/postsController');
const NotificationController = require('./Routes/notificationsController');

app.use('/users', UserController);
app.use('/posts', PostController);
app.use('/notifications', NotificationController);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});