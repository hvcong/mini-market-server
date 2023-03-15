const { Product, SubCategory, Image, UnitType } = require("../config/persist");
const { getById } = require("../services/SubCategoryServices");
const { getPriceByProductId } = require("../services/PriceServices");
const { create } = require("../services/ImageServices");
const { createManyUnit } = require("../services/UnitTypeServices");
const ProductServices = {
  getProductById: async (id) => {
    try {
      const product = await Product.findOne({ where: { id: id } });
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
  getProductByName: async (proName) => {
    try {
      const products = await Product.findAll({
        limit: 20,
        where: { name: proName },
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
  addProduct: async (data) => {
    try {
      const {
        id,
        name,
        images,
        description,
        quantity,
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
          quantity,
          state,
        });
        const sub = await getById(subCategoryId);
        if (sub.isSuccess) {
          await product.setSubCategory(sub.subCategory);
        }
        const uris = await create(images);
        await product.setImages(uris);
        const { units } = await createManyUnit(unitTypes);
        await product.setUnitTypes(units);
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
