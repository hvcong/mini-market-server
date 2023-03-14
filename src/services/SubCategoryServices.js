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
      const page = query._page && Number(query._page) || 1
      const limit = (query._limit && Number(query._limit)) || 20;
      const offset = (page -1 ) * limit
      const subs = await SubCategory.findAndCountAll({ limit: limit,offset: offset });
      return { subs, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getById: async (id) =>{
    try {
      const subCategory = await SubCategory.findOne({ where: {id: id}});
      if(subCategory){
        return {subCategory,isSuccess: true,status: 200}
      }
      return {message: 'subCategory not found',isSuccess: false, status: 404}
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  createBulkSub: async(data) =>{
    try {
      const subCategories = await SubCategory.bulkCreate(data)
      return subCategories
    } catch (error) {
      console.log(error)
      return false
    }
  }
};

module.exports = services;
