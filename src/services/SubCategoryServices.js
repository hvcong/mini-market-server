const { SubCategory, Category } = require("../config/persist");

const services = {
  add: async (data) => {
    try {
      const { id, name, state, categoryId } = data;
      var sub = await SubCategory.findOne({ where: { id: id } });
      const cate = await Category.findOne({ where: { id: categoryId } });
      if (sub) {
        return {
          message: "this subCategory already exists",
          isSuccess: false,
          status: 403,
        };
      } else {
        sub = await SubCategory.create({ id, name, state });
        await sub.setCategory(cate);
        return { sub, isSuccess: true, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (id, data) => {
    try {
      const sub = await SubCategory.findOne({ where: { id: id } });
      if (!sub) {
        return {
          message: "subCategory not exists",
          isSuccess: false,
          status: 404,
        };
      } else {
        await sub.update(data)
        await sub.save()
        return { message: "updated successful", isSuccess: true, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async (query) => {
    try {
      const limit = (query._limit && Number(query._limit)) || 20;
      const subs = await SubCategory.findAll({ limit: limit });
      return { subs, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getById: async (id) =>{
    try {
      const sub = await SubCategory.findOne({ where: {id: id}});
      if(sub)
      return sub
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  }
};

module.exports = services;
