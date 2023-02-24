const db = require("..//config/persist");
const { Op } = require("sequelize");
const {createCategory} = require('../services/CategoryServices')
const Category = db.Category;

const CategoryController = {
  addNewCategory: async (req, res) => {
    try {
      const newCategoryName = req.body.name;
      const check = createCategory(newCategoryName)
      if (check) {
        return res
          .status(406)
          .json({ message: "this category already exists", result: false });
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
      const category = await Category.findOne({
        where: { [Op.like]: categoryName },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "something goes wrong", result: false });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const category = Category.findOne({ where: { id: id } });
      if (category) {
        category.destroy();
        return res.status(200).json({ result: "deleted successful" });
      } else {
        return res.status(403).json({ result: "category not found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "something goes wrong", result: false });
    }
  },
};

module.exports = CategoryController;
