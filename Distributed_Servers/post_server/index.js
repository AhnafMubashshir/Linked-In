var express = require('express');
var cors = require('cors');
const connectDB = require('./Database/db');

const PORT = 6003;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const PostController = require('./Routes/postsController');

app.use('/posts', PostController);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});