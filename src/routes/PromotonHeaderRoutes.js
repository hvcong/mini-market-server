const routes = require("express").Router();
const controller = require("../controllers/PromotionController");

routes.post("/add", controller.add);
routes.put("/update/:id", controller.update);
routes.delete("/delete", controller.delete);
routes.get("/get", controller.getAll);
routes.get("/getId", controller.getOneById);

module.exports = routes;
