const routes = require("express").Router();
const controller = require("../controllers/TypeCustomerController");

routes.post("/add", controller.create);
routes.put("/update", controller.update);
routes.get("/get", controller.get);
routes.get('/getId',controller.getOne)

module.exports = routes;
