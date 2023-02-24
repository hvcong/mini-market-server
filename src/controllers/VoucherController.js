const voucherService = require("../services/voucherService");

const VoucherController = {
  add: async (req, res) => {
    let result = await voucherService.create(req.body);

    if (!result.isSuccess) {
      return res.status(300).json(result);
    }
    return res.status(200).json(result);
  },

  delete: async (req, res) => {
    let result = await voucherService.delete(req.params.id);
    if (!result.isSuccess) {
      return res.status(300).json(result);
    }

    return res.status(200).json(result);
  },
};

module.exports = VoucherController;
