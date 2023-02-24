const voucherService = require("../services/voucherService");

const VoucherController = {
  add: async (req, res) => {
    let result = await voucherService.create(req.body);

    return res.status(result.errCode).json(result);
  },
};

module.exports = VoucherController;
