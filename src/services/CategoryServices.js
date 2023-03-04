const db = require("../config/persist");
const Category = db.Category;

const CategoryServices = {
  createCategory: async (categoryName) => {
    const check = await Category.findOne({ where: { name: categoryName } });
    console.log(check);
    if (check) {
      return false;
    } else {
      const cate = await Category.create(categoryName);
      return cate;
    }
  },
  getCategoryByName: async (categoryName) => {
    const cate = await Category.findOne({ where: { name: categoryName } });
    if (!cate) {
      return false;
    } else {
      return cate;
    }
  },
};

module.exports = CategoryServices;
