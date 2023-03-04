const voucherService = require("../services/voucherService");

const VoucherController = {
  add: async (req, res) => {
    let result = await voucherService.create(req.body);

    if (!result.isSuccess) {
      return res.status(300).json(result);
    }
    return res.status(200).json(result);
  },

  deleteById: async (req, res) => {
    let result = await voucherService.deleteById(req.params.id);
    if (!result.isSuccess) {
      return res.status(300).json(result);
    }

    return res.status(200).json(result);
  },
  getByCode: async (req, res) => {
    let result = await voucherService.getByCode(req.params.code);
    if (!result.isSuccess) {
      return res.status(300).json(result);
    }

    return res.status(200).json(result);
  },

  updateWhenIsUsed: async (req, res) => {
    let result = await voucherService.updateWhenIsUsed(req.params.code);
    if (!result.isSuccess) {
      return res.status(300).json(result);
    }

    return res.status(200).json(result);
  },

  getAllUsableVoucher: async (req, res) => {
    let result = await voucherService.getAllUsableVoucher();
    if (!result.isSuccess) {
      return res.status(300).json(result);
    }
    return res.status(200).json(result);
  },
};

module.exports = VoucherController;
