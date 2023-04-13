const VoucherController = require("../controllers/VoucherController");

const VoucherRoutes = require("express").Router();

VoucherRoutes.post("/", VoucherController.add);
VoucherRoutes.delete("/delete", VoucherController.delete);
VoucherRoutes.delete("/:id", VoucherController.deleteById);
VoucherRoutes.put("/update", VoucherController.update);
VoucherRoutes.get("/useable", VoucherController.getAllUsableVoucher);
VoucherRoutes.get("/getByCode", VoucherController.getByCode);
VoucherRoutes.get("/getId", VoucherController.getById);

module.exports = VoucherRoutes;
