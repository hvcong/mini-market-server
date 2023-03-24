const routes = require("express").Router();

const controller = require("../controllers/PromotionResultController");
routes.post("/add", controller.create);
routes.get("/get", controller.getAll);
routes.get("/getId", controller.getById);

module.exports = routes;
