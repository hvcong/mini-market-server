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
    const bycode = req.query.bycode;
    const { isSuccess, status, message, voucher } =
      await voucherService.getByCode(bycode);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, voucher });
    }
    return res.status(status).json({ isSuccess, message });
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
