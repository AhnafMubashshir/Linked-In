const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = "Images";
const upload = multer({ dest: storage });
var Minio = require("minio");

const bucketName = "linkedinimages";

var minioClient = new Minio.Client({
  endPoint: "host.docker.internal",
  port: 9000,
  useSSL: false,
  accessKey: "65MaCOyNO04aYmM3oQKD",
  secretKey: "iFRRAj0s8TJUdRAIHf8LPvyzgZbMAMRmCyJlDsVv",
});

// console.log(minioClient);

var policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicRead",
      Effect: "Allow",
      Principal: "*",
      Action: ["s3:GetObject"],
      Resource: [`arn:aws:s3:::${bucketName}/*`],
    },
  ],
};

minioClient.setBucketPolicy(bucketName, JSON.stringify(policy), function (err) {
  if (err) return console.log("bucket Error: ", err);
  console.log("Bucket policy is set.");
});

minioClient.bucketExists(bucketName, function (err, exists) {
  if (err) {
    return console.log(err);
  }

  if (!exists) {
    minioClient.makeBucket(bucketName, (err) => {
      if (err) [console.log("minio errorL: ", err)];
    });
  }
});

router.post("/uploadImage", upload.array("image"), (req, res) => {
  const files = req.files;
  var URL;

  files.forEach((file) => {
    const fileName = file.originalname;
    const filePath = file.path;
    const metaData = {
      "Content-Type": file.mimetype,
    };
    URL = fileName;

    minioClient.fPutObject(
      bucketName,
      fileName,
      filePath,
      metaData,
      (err, etag) => {
        if (err) {
          console.log(err);
          res.json({ message: `MinIO Error: ${err}` });
        }
      }
    );
  });

  res.status(200).json({ message: "Image upload successful", url: URL });
});

module.exports = router;
