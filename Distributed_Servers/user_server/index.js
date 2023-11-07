var express = require('express');
var cors = require('cors');
const connectDB = require('./Database/db');

const PORT = 6004;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const UserController = require('./Routes/usersController');

app.use('/users', UserController);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});