const { Op } = require("sequelize");
const Voucher = require("../models/Voucher");

const voucherService = {
  create: async (data) => {
    const { code, startDate, endDate } = data;

    // check data
    if (!code || !startDate || !endDate) {
      return {
        isSuccess: false,
        message: "Missing some data",
        status: 400,
      };
    }
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

  updateWhenIsUsed: async (id) => {    
    try {
      const voucher = await Voucher.findOne({ where: { id: id } });
      if(!voucher){
        return {message: 'voucher not found',isSuccess: false, status: 404}
      }
      await voucher.update({ state: false });
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
  getById: async (id) =>{
    try {
      const voucher = await Voucher.findByPk(id)
      if(!voucher){
        return {message: 'not found', isSuccess: false,status: 404}
      }
      return {voucher,isSuccess: true,status: 200}
    } catch (error) {
      console.log(error)
      return {message:'something went wrong', isSuccess: false, status: 500}
    }
  }
};

module.exports = voucherService;
