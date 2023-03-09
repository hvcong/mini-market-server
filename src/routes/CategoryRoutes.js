const routes = require("express").Router();

const controller = require("../controllers/CategoryController");

routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.get("/get", controller.get);

module.exports = routes;
