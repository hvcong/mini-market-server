require("dotenv").config();

const fs = require("fs");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.AWSBUCKETNAME;
const region = process.env.AWSBUCKETREGION;
const accessKeyId = process.env.AWSBUCKETACCESSKEY;
const secretAccessKey = process.env.AWSBUCKETSECRETKEY;
const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

const s3Services = {
  uploadFile: async (file) => {
    const uploadParams = {
      Bucket: bucketName,
      Body: file.buffer,
      Key: file.originalname,
      ContentType: file.mimetype,
    };
    const getParams = {
      Bucket: bucketName,
      Key: file.originalname,
    };
    const command = new PutObjectCommand(uploadParams);
    const getCommand = new GetObjectCommand(getParams);
    try {
      await s3.send(command);
    } catch (error) {
      return false;
    }
    const url = await getSignedUrl(s3, getCommand, {
      expiresIn: 3600 * 24,
    });
    return url;
  },
};

module.exports = s3Services;
