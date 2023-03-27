const services = require("../services/MoneyPromotionServices");
const Controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.add(data);
    const { isSuccess, status, promotion, message } = result;
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
    const { isSuccess, status, message } = result;
    return res.status(status).json({ message, isSuccess });
  },
  delete: async (req, res) => {
    const id = req.query.id;
    const result = await services.delete(id);
    const { isSuccess, status, message } = result;
    return res.status(status).json({ message, isSuccess });
  },
  get: async (req, res) => {
    const {query} = req
    const result = await services.get(query);
    const { isSuccess, status, promotions, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, promotions });
    } else {
      return res.status(status).json({ message, isSuccess });
    }
  },
  getById: async (req,res) =>{
    const id = req.query.id
    const {isSuccess,status,message,moneyPromotion} = await services.getByid(id)
    if(isSuccess){
      return res.status(status).json({isSuccess,moneyPromotion})
    }
    return res.status(status).json({isSuccess,message})
  }
};
module.exports = Controller;
