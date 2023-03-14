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
  getByid: async (req,res) =>{
    const id = req.query.id
    const {isSuccess,status,category,message} = await services.getById(id)
    if(isSuccess){
      return res.status(status).json({isSuccess,category})
    }
    return res.status(status).json({isSuccess,message})
  }
};

module.exports = CategoryController;
