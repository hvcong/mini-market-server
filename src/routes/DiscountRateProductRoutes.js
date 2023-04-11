const routes = require("express").Router();
const controller = require("../controllers/DiscountRateProduct");

routes.post("/add", controller.add);
routes.get("/get", controller.get);
routes.put("/update", controller.update);
routes.delete("/delete", controller.delete);
routes.get("/getId", controller.getById);

module.exports = routes;
