const routes = require("express").Router();

const controller = require("../controllers/SubCategoryController");

routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.get("/get", controller.get);
routes.get("/getById", controller.getById);
routes.get("/getName", controller.getByName);
routes.get("/getState", controller.getByState);
routes.get('/getCateId',controller.getByCateId)

module.exports = routes;
