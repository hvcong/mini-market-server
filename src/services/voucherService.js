const Voucher = require("../models/Voucher");

const voucherService = {
  create: (data) =>
    new Promise(async (resolve, reject) => {
      const {
        code,
        startDate,
        endDate,
        disCountMoney,
        disCountPercent,
        maxDiscountMoney,
      } = data;
      console.log(data);

      // check data
      if (!code || !startDate || !endDate || !maxDiscountMoney) {
        resolve({
          isSucess: false,
          message: "Missing some data",
        });
      }

      if (!disCountMoney && !disCountPercent) {
        resolve({
          isSucess: false,
          message: "Missing some data",
        });
      }

      try {
        let voucher = await Voucher.create({
          code,
          startDate,
          endDate,
          disCountMoney,
          disCountPercent,
          maxDiscountMoney,
        });

        resolve({
          isSucess: true,
          message: "Create voucher oke",
          voucher,
        });
      } catch (error) {
        resolve({
          isSucess: false,
          message: "Internal server error",
        });
      }
    }),

  delete: (id) =>
    new Promise(async (resolve) => {
      if (!id) {
        resolve({
          isSucess: false,
          message: "Missing voucher id",
        });
      }

      try {
        await Voucher.destroy({
          where: {
            id,
          },
        });

        resolve({
          isSucess: true,
          message: "Delete oke",
        });
      } catch (error) {
        console.log(error);
        resolve({
          isSucess: false,
        });
      }
    }),
};

module.exports = voucherService;
