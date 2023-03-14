const routes = require("express").Router();

const controller = require("../controllers/CategoryController");

routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.get("/get", controller.get);
routes.get('/getById',controller.getByid)

module.exports = routes;
