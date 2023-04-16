const routes = require("express").Router();

const controller = require("../controllers/ListPricesHeaderController");
routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.delete("/delete", controller.delete);
routes.get("/get", controller.get);
routes.get("/getId", controller.getById);
routes.get("/active", controller.getAllOnActive);
routes.get("/active2", controller.getAllOnActive2);

module.exports = routes;
