const { SubCategory, Category } = require("../config/persist");
const { Op } = require("sequelize");
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
        await sub.update(data);
        await sub.save();
        return { message: "updated successful", isSuccess: true, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async (query) => {
    try {
      const page = (query._page && Number(query._page)) || 1;
      const limit = (query._limit && Number(query._limit)) || 20;
      const offset = (page - 1) * limit;
      const subs = await SubCategory.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [['updateAt','DESC']],
      });
      return { subs, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getById: async (id) => {
    try {
      const subCategory = await SubCategory.findOne({
        where: { id: id },
      });
      if (subCategory) {
        return { subCategory, isSuccess: true, status: 200 };
      }
      return {
        message: "subCategory not found",
        isSuccess: false,
        status: 404,
      };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  createBulkSub: async (data) => {
    try {
      const subCategories = await SubCategory.bulkCreate(data);
      return subCategories;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getByName : async (query) =>{
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    const offset = (page - 1) * limit;
    const name = query.name;
    try {
      const subCategories = await SubCategory.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [['updateAt','DESC']],
        where: { name: { [Op.like ]: `%${name}%`} },
      });
      if (subCategories) {
        return { subCategories, isSuccess: true, status: 200 };
      }
      return {
        message: "subCategory not found",
        isSuccess: false,
        status: 404,
      };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getByState : async (query) =>{
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    const offset = (page - 1) * limit;
    const state = query.state;
    try {
      const subCategories = await SubCategory.findAndCountAll({
        limit: limit,
        offset: offset,
        where: { state: state },
        order: [['updateAt','DESC']]
      });
      if (subCategories) {
        return { subCategories, isSuccess: true, status: 200 };
      }
      return {
        message: "subCategory not found",
        isSuccess: false,
        status: 404,
      };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getByCateId : async (query) =>{
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    const offset = (page - 1) * limit;
    const cateId = query.cateId;
    try {
      const subCategories = await SubCategory.findAndCountAll({
        limit: limit,
        offset: offset,
        include: {
          model: Category,
          where: {id: {[Op.like]: `%${cateId}%`}},                    
        },
        distinct: true,
        order: [['updateAt','DESC']]
      });
      if (subCategories) {
        return { subCategories, isSuccess: true, status: 200 };
      }
      return {
        message: "subCategory not found",
        isSuccess: false,
        status: 404,
      };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
