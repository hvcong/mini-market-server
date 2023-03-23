const services = require("../services/PromotionServices");
const controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.add(data);
    const { isSuccess, status, message, promotion } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, promotion });
    } else {
      return res.status(status).json({ message, isSuccess });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const result = await services.update(id, data);
    const { isSuccess, message, status } = result;
    return res.status(status).json({ message, isSuccess });
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const result = await services.delete(id);
    const { isSuccess, message, status } = result;
    return res.status(status).json({ message, isSuccess });
  },
  getAll: async (req, res) => {
    const { query } = req;
    const result = await services.getAll(query);
    const { isSuccess, status, message, promotions } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, promotions });
    } else {
      return res.status(status).json({ message, isSuccess });
    }
  },
<<<<<<< HEAD
  getOne: async (req,res) =>{
    const id = req.query.id
    const {isSuccess,status,message,promotion} = await services.getById(id)
    if(isSuccess){
      return res.status(status).json({isSuccess,promotion})
    }
    return res.status(status).json({isSuccess,message})
  }
=======
  getOneById: async (req, res) => {
    const id = req.query.id;
    const result = await services.getById(id);

    const { promotion, isSuccess, status, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, promotion });
    } else {
      return res.status(status).json({ message, isSuccess });
    }
  },
>>>>>>> a589e8d8600683eb9b76a4caec707495e991d3b3
};

module.exports = controller;
