const services = require("../services/CategoryServices");

const CategoryController = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.add(data);
    const { isSuccess, status, cate, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, cate });
    }
    return res.status(status).json({ isSuccess, message });
  },
  update: async (req, res) => {
    const data = req.body;
    const {id,...newData} =data
    const result = await services.update(id, newData);
    const { isSuccess, status, message } = result;
    return res.status(status).json({ isSuccess, message });
  },
  delete: async (req, res) => {
  },
  get: async (req, res) => {
    const query = req.query;
    const result = await services.get(query);
    const { isSuccess, status, cates, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, cates });
    }
    return res.status(status).json({ isSuccess, message });
  },
};

module.exports = CategoryController;
