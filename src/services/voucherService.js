const Voucher = require("../models/Voucher");

const voucherService = {
  create: async (body) => {
    const {
      code,
      startDate,
      endDate,
      disCountMoney,
      disCountPercent,
      maxDiscountMoney,
    } = body;

    if (!code || !startDate || !endDate) {
      return {
        result: false,
        message: "Please enter full information of voucher",
        errCode: 400,
      };
    }

    if (maxDiscountMoney) {
      //handle
    }

    try {
      await Voucher.create({
        code,
        startDate,
        endDate,
        disCountMoney,
        disCountPercent,
        maxDiscountMoney,
      });

      return res;
    } catch (error) {
      return {
        result: false,
        message: "something goes wrong",
        errCode: 500,
      };
    }
  },
};

module.exports = voucherService;
