const { Product, Category, Price } = require("../config/persist");
const { getCategoryByName, createCategory } = require("./CategoryServices");

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
        // include: { model: db.Category },
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
      const { id, name, image, description, quantity } = data;
      const categoryName = data.category;
      const check = await Product.findOne({ where: { id: id } });
      if (check) {
        const newQty = check.quantity + quantity;
        await check.update({ quantity: newQty });
        await check.save();
        return check;
      } else {
        const product = await Product.create({
          id,
          name,
          image,
          description,
          quantity,
        });
        const cate = await getCategoryByName(categoryName);
        if (cate) {
          await product.setCategories([cate]);
        } else {
          await product.createCategory({ name: categoryName });
        }
        return product;
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
  getProductByCategory: async (cateName) => {
    try {
      const products = await Product.findAll({
        limit: 20,
        include: [
          {
            model: Category,
            where: cateName,
            through: {
              attributes: [],
            },
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
          { model: Category, through: { attributes: [] } },
          { model: Price },
        ],
      });
      return { products, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = ProductServices;
