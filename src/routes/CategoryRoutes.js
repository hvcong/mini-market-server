const routes = require("express").Router();

const controller = require("../controllers/CategoryController");

routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.get("/get", controller.get);
routes.get('/getId',controller.getByid)
routes.get('/getState',controller.getByState)
routes.get('/getName',controller.getByName)
routes.get('/filter',controller.filter)

module.exports = routes;
