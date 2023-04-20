const routes = require("express").Router();
const controller = require("../controllers/PromotionController");

routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.delete("/delete", controller.delete);
routes.get("/get", controller.getAll);
routes.get("/getId", controller.getOne);
routes.get("/getAll/active", controller.getAllOnActive);
routes.get("/productPr",controller.getProductPromotion)
routes.get("/ratePr",controller.getRatePromotion)
routes.get('/forType',controller.getPromotionFor)
routes.get('/stastics',controller.promotionStatistics)

module.exports = routes;
