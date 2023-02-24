const { Op } = require("sequelize");
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
        remainingUsage,
      } = data;

      // check data
      if (!code || !startDate || !endDate || !maxDiscountMoney) {
        return resolve({
          isSuccess: false,
          message: "Missing some data",
        });
      }

      if (!disCountMoney && !disCountPercent) {
        return resolve({
          isSuccess: false,
          message: "Missing some data",
        });
      }

      try {
        let voucher = await Voucher.create({
          code: code.toUpperCase(),
          startDate,
          endDate,
          disCountMoney,
          disCountPercent,
          maxDiscountMoney,
          remainingUsage,
        });

        return resolve({
          isSuccess: true,
          message: "Create voucher oke",
          voucher,
        });
      } catch (error) {
        return resolve({
          isSuccess: false,
          message: "Internal server error",
        });
      }
    }),

  deleteById: (id) =>
    new Promise(async (resolve) => {
      if (!id) {
        return resolve({
          isSuccess: false,
          message: "Missing voucher id",
        });
      }

      try {
        await Voucher.destroy({
          where: {
            id,
          },
        });

        return resolve({
          isSuccess: true,
          message: "Delete oke",
        });
      } catch (error) {
        console.log(error);
        return resolve({
          isSuccess: false,
        });
      }
    }),

  getByCode: (code) =>
    new Promise(async (resolve) => {
      if (!code)
        return resolve({
          isSuccess: false,
          message: "Missing vocher id",
        });

      try {
        let voucher = await Voucher.findOne({
          where: {
            code,
          },
        });
        if (!voucher) {
          return resolve({
            isSuccess: false,
            message: "Voucher not found",
          });
        }

        return resolve({
          isSuccess: true,
          voucher,
        });
      } catch (error) {
        return resolve({
          isSuccess: false,
          message: "Internal server error",
        });
      }
    }),

  updateWhenIsUsed: (code) =>
    new Promise(async (resolve) => {
      if (!code) {
        return resolve({
          isSuccess: false,
          message: "Missing code",
        });
      }

      try {
        const result = await voucherService.getByCode(code);

        if (!result.voucher) {
          return resolve(result);
        }

        const { voucher } = result;

        if (!voucher.isActive || voucher.remainingUsage <= 0) {
          return resolve({
            isSuccess: false,
            message: "Voucher can't use",
          });
        }

        if (voucher.endDate > new Date()) {
          return resolve({
            isSuccess: false,
            message: "Voucher is expired",
          });
        }

        // oke
        await Voucher.update(
          {
            remainingUsage: voucher.remainingUsage - 1,
            isActive: voucher.remainingUsage == 1 ? false : true,
          },
          {
            where: {
              code,
            },
          }
        );

        return resolve({
          isSuccess: true,
          message: "Using voucher oke",
        });
      } catch (error) {
        return resolve({
          isSuccess: false,
          message: "Internal server error",
        });
      }
    }),

  getAllUsableVoucher: () =>
    new Promise(async (resolve) => {
      try {
        const vouches = await Voucher.findAll({
          where: {
            isActive: true,
            endDate: {
              [Op.lte]: new Date(),
            },
            remainingUsage: {
              [Op.gt]: 0,
            },
          },
        });

        return resolve({
          isSuccess: true,
          vouches,
        });
      } catch (error) {
        return resolve({
          isSuccess: false,
          message: "Internal server error",
        });
      }
    }),
};

module.exports = voucherService;
