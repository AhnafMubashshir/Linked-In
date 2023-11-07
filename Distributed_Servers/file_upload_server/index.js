var express = require('express');
var cors = require('cors');

const PORT = 6001;
const app = express();

app.use(cors());
app.use(express.json());

const FileUploadController = require('./Routes/fileUploadController');

app.use('/upload', FileUploadController);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});