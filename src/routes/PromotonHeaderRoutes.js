const routes = require("express").Router();
const controller = require("../controllers/PromotionController");

routes.post("/add", controller.add);
routes.put("/update/:id", controller.update);
routes.delete("/delete", controller.delete);
routes.get("/get", controller.getAll);
<<<<<<< HEAD
routes.get('/getId',controller.getOne)
=======
routes.get("/getId", controller.getOneById);
>>>>>>> a589e8d8600683eb9b76a4caec707495e991d3b3

module.exports = routes;
