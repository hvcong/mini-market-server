const { Op } = require("sequelize");
const Voucher = require("../models/Voucher");

const voucherService = {
  create: async (data) => {
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
      return {
        isSuccess: false,
        message: "Missing some data",
      };
    }

    if (!disCountMoney && !disCountPercent) {
      return {
        isSuccess: false,
        message: "Missing some data",
      };
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

      return {
        isSuccess: true,
        message: "Create voucher oke",
        voucher,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Internal server error",
      };
    }
  },

  deleteById: async (id) => {
    if (!id) {
      return {
        isSuccess: false,
        message: "Missing voucher id",
      };
    }

    try {
      await Voucher.destroy({
        where: {
          id,
        },
      });

      return {
        isSuccess: true,
        message: "Delete oke",
      };
    } catch (error) {
      console.log(error);
      return {
        isSuccess: false,
      };
    }
  },

  getByCode: async (code) => {
    if (!code)
      return {
        isSuccess: false,
        message: "Missing vocher id",
      };

    try {
      let voucher = await Voucher.findOne({
        where: {
          code,
        },
      });
      if (!voucher) {
        return {
          isSuccess: false,
          message: "Voucher not found",
        };
      }

      return {
        isSuccess: true,
        voucher,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Internal server error",
      };
    }
  },

  updateWhenIsUsed: async (code) => {
    if (!code) {
      return {
        isSuccess: false,
        message: "Missing code",
      };
    }

    try {
      const result = await voucherService.getByCode(code);

      if (!result.voucher) {
        return result;
      }

      const { voucher } = result;

      if (!voucher.isActive || voucher.remainingUsage <= 0) {
        return {
          isSuccess: false,
          message: "Voucher can't use",
        };
      }

      if (voucher.endDate > new Date()) {
        return {
          isSuccess: false,
          message: "Voucher is expired",
        };
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

      return {
        isSuccess: true,
        message: "Using voucher oke",
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Internal server error",
      };
    }
  },

  getAllUsableVoucher: async () => {
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

      return {
        isSuccess: true,
        vouches,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Internal server error",
      };
    }
  },
};

module.exports = voucherService;
