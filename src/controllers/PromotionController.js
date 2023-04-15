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
    const id = req.query.id;
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
  getOne: async (req, res) => {
    const id = req.query.id;
    const { isSuccess, status, message, promotion } = await services.getById(
      id
    );
    if (isSuccess) {
      return res.status(status).json({ isSuccess, promotion });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getAllOnActive: async (req, res) => {
    const result = await services.getAllOnActive();
    const { isSuccess, status, message, promotions } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, promotions });
    } else {
      return res.status(status).json({ message, isSuccess });
    }
  },
  getProductPromotion: async (req,res) =>{
    const {query} = req
    const {isSuccess,status,message,promotions} = await services.getProductPromotion(query)
    if(isSuccess){
      return res.status(status).json({isSuccess,promotions})
    }
    return res.status(status).json({isSuccess,message})
  },
  getRatePromotion: async (req,res) =>{
    const {query} = req
    const {isSuccess,status,message,promotions} = await services.getRatePromotion(query)
    if(isSuccess){
      return res.status(status).json({isSuccess,promotions})
    }
    return res.status(status).json({isSuccess,message})
  }
};

module.exports = controller;
