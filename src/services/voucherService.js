const { Op, Sequelize } = require("sequelize");
const Voucher = require("../models/Voucher");
const PromotionResult = require("../models/PromotionResult");
const PromotionHeader = require("../models/PromotionHeader");
const TypeCustomer = require("../models/TypeCustomer");

const voucherService = {
  updateByGroup: async (groupVoucher, newData) => {
    try {
      await Voucher.update(newData, { where: { groupVoucher } });

      return { message: "udated successful", isSuccess: true, status: 200 };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Internal server error",
        status: 500,
      };
    }
  },
  getAllByGroup: async (groupVoucher) => {
    try {
      const vouches = await Voucher.findAll({
        order: [["updatedAt", "DESC"]],
        where: {
          groupVoucher: groupVoucher,
        },
        include: [{ model: PromotionResult }, { model: PromotionHeader }],
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
  deleteByGroup: async (groupVoucher) => {
    try {
      await Voucher.destroy({
        where: {
          groupVoucher,
        },
      });

      return {
        isSuccess: true,
        message: "Delete by group oke",
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
    try {
      const voucher = await Voucher.findOne({
        where: { code: code },
        include: [
          { model: PromotionHeader, include: [{ model: TypeCustomer }] },
          { model: PromotionResult },
        ],
      });
      if (!voucher) {
        return { message: "not found vy code", isSuccess: false, status: 404 };
      }
      return { voucher, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
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
      const voucher = await Voucher.findOne({
        where: {
          id: id,
        },
      });
      if (!voucher) {
        return { message: "not found", isSuccess: false, status: 404 };
      }
      return { voucher, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getVoucherPromotionByDate: async (from, to) => {
    try {
      if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        toDate.setDate(toDate.getDate() + 1);
        let vouchers = await Voucher.findAll({
          where: {
            [Op.and]: [
              { startDate: { [Op.gte]: fromDate } },
              { endDate: { [Op.lte]: toDate } },
            ],
          },
          attributes: [
            "PromotionHeaderId",
            "title",
            "startDate",
            "endDate",
            [
              Sequelize.fn("count", Sequelize.col("Voucher.id")),
              "sumAllVoucher",
            ],
          ],
          include: {
            model: PromotionResult,
            attributes: [
              [
                Sequelize.fn("sum", Sequelize.col("discountMoneyByVoucher")),
                "sumMoneyVoucher",
              ],
              [
                Sequelize.fn("count", Sequelize.col("VoucherId")),
                "voucherUsed",
              ],
            ],
          },
        });
        if (!vouchers) {
          return null;
        }
        return vouchers;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

module.exports = voucherService;
