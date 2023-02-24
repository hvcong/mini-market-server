const VoucherController = require("../controllers/VoucherController");

const VoucherRoutes = require("express").Router();

VoucherRoutes.post("/", VoucherController.add);
VoucherRoutes.delete("/:id", VoucherController.deleteById);
VoucherRoutes.get("/code/:code", VoucherController.getByCode);
VoucherRoutes.put("/code/:code/use", VoucherController.updateWhenIsUsed);
VoucherRoutes.get("/usable", VoucherController.getAllUsableVoucher);

module.exports = VoucherRoutes;
