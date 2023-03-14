const {Category,SubCategory} = require("../config/persist");
const {createBulkSub,update,add} = require('../services/SubCategoryServices')


const services = {
  add: async (data) => {
    try {
      const { id,name,image,state,subCategories } = data;
      var cate = await Category.findOne({ where: { id: id } });
      if (cate) {
        return {
          message: "category already exists",
          isSuccess: false,
          status: 403,
        };
      } else {
        cate = await Category.create({id,name,image,state});
        const result = await createBulkSub(subCategories)
        if(result){
          cate.setSubCategories(result)
        }
        return { cate, isSuccess: true, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (CateId, data) => {
    try {
      const cate = await Category.findOne({ where: { id: CateId } });
      const {name,image,state,subCategories} = data
      if (!cate) {
        return { message: "category not found", isSuccess: false, status: 404 };
      } else {
        await cate.update({name,image,state});
        for(const e of subCategories){
          const {id,...others} = e
          await add({...e,categoryId: CateId})
          await update(id,others)
        }
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
  },
  getById: async (id) =>{
    try {
      const category = await Category.findByPk(id)
      if(!category){
        return {message: 'category not found', isSuccess: false, status: 404}
      }
      return {category, isSuccess: true, status: 200}
    } catch (error) {
      console.log(error)
      return {message: 'something went wrong', isSuccess: false, status: 500}
    }
  },
};

module.exports = services;
