const routes = require("express").Router();
const controller = require("../controllers/HomeController");

routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.get("/get", controller.get);

module.exports = routes;
