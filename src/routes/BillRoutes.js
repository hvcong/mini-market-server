const routes = require("express").Router();
const controller = require("../controllers/BillController");

routes.post("/add", controller.add);
routes.get("/get", controller.get);
routes.get("/getId", controller.getById);
routes.get("/where", controller.getWhere);
routes.get("/success", controller.getSucceedBill);
routes.get("/fail", controller.getPendingCancelBill);
routes.put("/:id/update-type/:type", controller.updateType);

module.exports = routes;
