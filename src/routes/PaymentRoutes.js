const routes = require("express").Router();
const controller = require("../controllers/PaymentController");

routes.post("/pay", controller.paymentZalo);
routes.post("/paystatus", controller.getStatusPayment);

module.exports = routes;
