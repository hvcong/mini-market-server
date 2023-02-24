const db = require("../config/persist");
const Category = db.Category;

const CategoryServices = {
  createCategory: async (nameCategory) => {
    const check = await Category.findOne({ where: { name: nameCategory } });
    console.log(check)
    if (check) {
      return false;
    } else {
      const cate = await Category.create(nameCategory);
      return cate;
    }
  },
};

module.exports = CategoryServices