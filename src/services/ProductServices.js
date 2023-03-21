const { Product, SubCategory, Image, UnitType } = require("../config/persist");
const { Op } = require("sequelize");
const { getById } = require("../services/SubCategoryServices");
const { getPriceByProductId } = require("../services/PriceServices");
const { create } = require("../services/ImageServices");
const { getUnitByIds } = require("../services/UnitTypeServices");
const ProductServices = {
  getProductById: async (id) => {
    try {
      const product = await Product.findOne({
        where: { id: id },
        include: [
          {
            model: SubCategory,
          },
          {
            model: Image,
            as: "images",
            attributes: ["uri"],
          },
        ],
      });
      if (product) {
        return { product, isSuccess: true, status: 200 };
      } else {
        return { message: "product not found", isSuccess: false, status: 404 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getProductLikeId: async (id) =>{
    try {
      const products = await Product.findAll({
        where: { id: {[Op.like]: `%${id}%`} },
        include: [
          {
            model: SubCategory,
          },
          {
            model: Image,
            as: "images",
            attributes: ["uri"],
          },
        ],
      });
      if (products.length) {
        return { products, isSuccess: true, status: 200 };
      } else {
        return { message: "product not found", isSuccess: false, status: 404 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getProductByName: async (proName) => {
    try {
      const products = await Product.findAll({
        limit: 20,
        where: { name: { [Op.like]: `%${proName}%` } },
        include: [
          {
            model: SubCategory,
          },
          {
            model: Image,
            as: "images",
            attributes: ["uri"],
          },
        ],
      });
      if (products) {
        return { products, isSuccess: true, status: 200 };
      }
      return { message: "no products", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something goes wrong", isSuccess: false, status: 500 };
    }
  },
  getProductByState: async (query) => {
    try {
      let page = (query._page && Number(query._page)) || 1;
      let limit = (query._limit && Number(query._limit)) || 12;
      let offset = (page - 1) * limit;
      const state = query.state;
      console.log(state);
      const products = await Product.findAndCountAll({
        limit: limit,
        offset: offset,
        where: { state: state },
        include: [
          {
            model: SubCategory,
          },
          {
            model: Image,
            as: "images",
            attributes: ["uri"],
          },
        ],
        distinct: true,
      });
      return { products, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  addProduct: async (data) => {
    try {
      const {
        id,
        name,
        images,
        description,
        baseUnit,
        subCategoryId,
        state,
        unitTypes,
      } = data;
      const check = await Product.findOne({ where: { id: id } });
      if (check) {
        return {
          message: "product already exists",
          isSuccess: false,
          status: 403,
        };
      } else {
        const product = await Product.create({
          id,
          name,
          description,
          state,
          baseUnit,
        });
        const { subCategory } = await getById(subCategoryId);
        if (subCategory) {
          await product.setSubCategory(subCategory);
        }
        const uris = await create(images);
        await product.setImages(uris);
        const {listUnit} = await getUnitByIds(unitTypes)
        await product.setUnitTypes(listUnit);
        return { product, isSuccess: true, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  updateProduct: async (id, data) => {
    try {
      const product = await Product.findOne({ where: { id: id } });
      if (!product) {
        return { message: "product not found", isSuccess: false, status: 404 };
      }
      await product.update(data);
      await product.save();
      return { message: "updated succesful", isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  deleteProduct: async (id) => {
    try {
      const product = await Product.findOne({ where: { id: id } });
      if (!product) {
        return { message: "product not found", isSuccess: false, status: 404 };
      }
      await product.destroy();
      return { message: "deleted successful", isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getProductByCategory: async (id) => {
    try {
      const products = await Product.findAll({
        limit: 20,
        include: [
          {
            model: SubCategory,
            where: { id: id },
            attributes: ["id", "name", "CategoryId"],
          },
        ],
      });
      if (!products.length) {
        return { message: "no products", isSuccess: false, status: 404 };
      }
      return { products, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getAllProducts: async (query) => {
    try {
      let page = (query._page && Number(query._page)) || 1;
      let limit = (query._limit && Number(query._limit)) || 12;
      let offset = (page - 1) * limit;
      const products = await Product.findAndCountAll({
        limit: limit,
        offset: offset,
        include: [
          {
            model: SubCategory,
          },
          {
            model: Image,
            as: "images",
            attributes: ["uri"],
          },
        ],
        distinct: true,
      });
      return { products, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = ProductServices;
