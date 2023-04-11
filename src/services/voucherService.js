const { Op } = require("sequelize");
const Voucher = require("../models/Voucher");
const PromotionResult = require("../models/PromotionResult");
const PromotionHeader = require("../models/PromotionHeader");
const TypeCustomer = require("../models/TypeCustomer");

const voucherService = {
  create: async (data) => {
    const { code, startDate, endDate } = data;

    try {
      let voucher = await Voucher.findOne({ where: { code: code } });
      if (voucher) {
        return {
          message: "the code is already exists",
          isSuccess: false,
          status: 400,
        };
      }
      voucher = await Voucher.create(data);
      return {
        voucher,
        isSuccess: true,
        status: 200,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: "something went wrong",
        status: 500,
      };
    }
  },
  delete: async (id) => {
    try {
      const check = await Voucher.findOne({ where: { id: id } });
      if (check) {
        await check.destroy();
        return { message: "deleted successful", isSuccess: true, status: 200 };
      } else {
        return {
          message: "voucher promotion not found",
          isSuccess: false,

          status: 404,
        };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
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
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        isSuccess: false,
        message: "something went wrong",
        status: 500,
      };
    }
  },

  getByCode: async (code) => {
    console.log(code);
    if (!code)
      return {
        isSuccess: false,
        message: "Missing vocher id",
      };

    try {
      let voucher = await Voucher.findOne({
        where: {
          code: code,
        },
        include: [
          { model: PromotionResult },
          { model: PromotionHeader, include: [{ model: TypeCustomer }] },
        ],
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

  update: async (id, data) => {
    try {
      const voucher = await Voucher.findOne({ where: { id: id } });
      if (!voucher) {
        return { message: "voucher not found", isSuccess: false, status: 404 };
      }
      await voucher.update(data);
      await voucher.save();
      return { message: "udated successful", isSuccess: true, status: 200 };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Internal server error",
        status: 500,
      };
    }
  },

  getAllUsableVoucher: async () => {
    try {
      const vouches = await Voucher.findAll({
        order: [["updatedAt", "DESC"]],
        where: {
          state: true,
          endDate: {
            [Op.lte]: new Date(),
          },
        },
      });
      return {
        isSuccess: true,
        vouches,
        status: 200,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Internal server error",
        status: 500,
      };
    }
  },
  getById: async (id) => {
    try {
      const voucher = await Voucher.findByPk(id);
      if (!voucher) {
        return { message: "not found", isSuccess: false, status: 404 };
      }
      return { voucher, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = voucherService;
