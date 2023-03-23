const VoucherController = require("../controllers/VoucherController");

const VoucherRoutes = require("express").Router();

VoucherRoutes.post("/", VoucherController.add);
VoucherRoutes.delete("/:id", VoucherController.deleteById);
VoucherRoutes.get("/get", VoucherController.getByCode);
VoucherRoutes.put("/update", VoucherController.updateWhenIsUsed);
VoucherRoutes.get("/useable", VoucherController.getAllUsableVoucher);

module.exports = VoucherRoutes;
