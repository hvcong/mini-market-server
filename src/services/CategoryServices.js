const {Category,SubCategory} = require("../config/persist");


const services = {
  add: async (data) => {
    try {
      const { id } = data;
      var cate = await Category.findOne({ where: { id: id } });
      if (cate) {
        return {
          message: "category already exists",
          isSuccess: false,
          status: 403,
        };
      } else {
        cate = await Category.create(data);
        return { cate, isSuccess: true, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (id, data) => {
    try {
      const cate = await Category.findOne({ where: { id: id } });
      if (!cate) {
        return { message: "category not found", isSuccess: false, status: 404 };
      } else {
        await cate.update(data);
        await cate.save();
        return { message: "updated successful", isSuccess: true, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false };
    }
  },
  get: async (query) =>{
    try {
      const limit = (query._limit && Number(query._limit)) || 20;
      const cates = await Category.findAll({ limit: limit, include: { model: SubCategory, attributes: ['id','name','state']}});
      return { cates, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  }
};

module.exports = services;
