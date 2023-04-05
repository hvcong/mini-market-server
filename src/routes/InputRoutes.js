const routes = require("express").Router();

const controller = require("../controllers/InputController");
routes.post("/add", controller.add);
routes.get("/get", controller.get);
routes.get("/one", controller.getOne);
routes.put("/update", controller.update);

module.exports = routes;
