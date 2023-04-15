const VoucherController = require("../controllers/VoucherController");

const VoucherRoutes = require("express").Router();

VoucherRoutes.post("/", VoucherController.add);
VoucherRoutes.delete("/delete", VoucherController.delete);
VoucherRoutes.delete("/deleteByGroup", VoucherController.deleteByGroup);
VoucherRoutes.put("/update", VoucherController.update);
VoucherRoutes.put("/updateByGroup", VoucherController.updateByGroup);
VoucherRoutes.get("/useable", VoucherController.getAllUsableVoucher);
VoucherRoutes.get("/getByCode", VoucherController.getByCode);
VoucherRoutes.get("/getId", VoucherController.getById);
VoucherRoutes.get("/getAllByGroup", VoucherController.getAllByGroup);
VoucherRoutes.delete("/:id", VoucherController.deleteById);

module.exports = VoucherRoutes;
