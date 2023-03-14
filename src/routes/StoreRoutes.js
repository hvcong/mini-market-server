const routes = require("express").Router();

const controller = require("../controllers/StoreController");
routes.post("/add", controller.add);
routes.get("/get", controller.get);

module.exports = routes;
