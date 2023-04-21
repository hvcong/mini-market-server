const routes = require("express").Router();
const controller = require("../controllers/EmployeeController");

routes.post("/add", controller.add);
routes.get("/phone", controller.getByPhone);
routes.get("/get", controller.get);
routes.put("/update/fullinfor", controller.updateFullInfoByPhone);
routes.put("/update", controller.update);
routes.get("/one/byId", controller.getOneById);
routes.get("/one", controller.getOnebyPhone);
routes.get("/filter",controller.filter);

module.exports = routes;
