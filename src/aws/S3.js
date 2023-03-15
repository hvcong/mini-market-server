require('dotenv').config()

const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWSBUCKETNAME
const region = process.env.AWSBUCKETREGION
const accessKeyId = process.env.AWSBUCKETACCESSKEY
const secretAccessKey = process.env.AWSBUCKETSECRETKEY
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
})

const s3Services = {
    uploadFile: async (file) =>{
        const fileStream = fs.createReadStream(file.path)
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename
        }
        return s3.upload(uploadParams).promise()
    }
}

module.exports = s3Services