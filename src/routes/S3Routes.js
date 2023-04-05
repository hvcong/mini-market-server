const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const controller = require("../controllers/S3Controller");

const routes = require("express").Router();
routes.post("/post", upload.single("file"), controller.upload);

module.exports = routes;
