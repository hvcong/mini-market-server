const multer = require('multer')
const upload = multer({dest: '../uploads/'})

const controller = require('../controllers/S3Controller')

const routes  = require('express').Router()
routes.post('/post',upload.single('file'),controller.upload)


module.exports = routes