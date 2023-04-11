const voucherService = require("../services/voucherService");

const VoucherController = {
  add: async (req, res) => {
    let { isSuccess, status, message, voucher } = await voucherService.create(
      req.body
    );
    if (!isSuccess) {
      return res.status(status).json({ isSuccess, message });
    }
    return res.status(status).json({ isSuccess, voucher });
  },
  delete: async (req, res) => {
    const id = req.query.id;
    const result = await voucherService.delete(id);
    const { isSuccess, status, message } = result;
    return res.status(status).json({ message, isSuccess });
  },

  deleteById: async (req, res) => {
    let { isSuccess, message, status } = await voucherService.deleteById(
      req.params.id
    );
    return res.status(status).json({ isSuccess, message });
  },
  getByCode: async (req, res) => {
    const code = req.query.code;
    let { isSuccess, message, voucher } = await voucherService.getByCode(code);
    if (!isSuccess) {
      return res.status(300).json({ isSuccess, message });
    }
    return res.status(200).json({ isSuccess, voucher });
  },

  update: async (req, res) => {
    const id = req.query.id;
    const data = req.body;
    let { isSuccess, message, status } = await voucherService.update(id, data);
    return res.status(status).json({ isSuccess, message });
  },

  getAllUsableVoucher: async (req, res) => {
    let { isSuccess, status, message, vouches } =
      await voucherService.getAllUsableVoucher();
    if (!isSuccess) {
      return res.status(status).json({ isSuccess, message });
    }
    return res.status(status).json({ isSuccess, vouches });
  },
  getById: async (req, res) => {
    const id = req.query.id;
    const { isSuccess, status, message, voucher } =
      await voucherService.getById(id);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, voucher });
    }
    return res.status(status).json({ isSuccess, message });
  },
};

module.exports = VoucherController;
