const db = require("..//config/persist");
const { Op } = require("sequelize");
const Category = db.Category;

const CategoryController = {
  addNewCategory: async (req, res) => {
    try {
      const newCategoryName = req.body.name;
      const check = await Category.findOne({
        where: { name: newCategoryName },
      });
      if (check) {
        return res.status(406).json({ result: "this category already exists" });
      } else {
        return res.status(200).json({
          result: "add new category successful",
          name: newCategoryName,
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "something goes wrong", result: false });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const categoryName = req.body.name;
      const category = await Category.findOne({ where: {[Op.like] : categoryName } });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "something goes wrong", result: false });
    }
  },
};
