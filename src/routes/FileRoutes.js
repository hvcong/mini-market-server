const FileRoutes = require("express").Router();
const controller = require("../controllers/FileController");

FileRoutes.get("/getTemplate", controller.get);

module.exports = FileRoutes;
