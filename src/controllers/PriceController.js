const services = require("../services/PriceServices");

const PriceController = {
  addPrice: async (req, res) => {
    const data = req.body;
    const result = await services.addPrice(data);
    const { isSuccess, status } = result;
    if (isSuccess) {
      const { productPrice } = result;
      return res.status(status).json({ isSuccess, productPrice });
    } else {
      const { message } = result;
      return res.status(status).json({ message, isSuccess });
    }
  },
  updatePrice: async (req, res) => {
    const id = req.query.id
    const data = req.body;
    const result = await services.updatePrice(id,data);
    const { message, isSuccess, status } = result;
    return res.status(status).json({ message, isSuccess });
  },
  deletePrice: async (req, res) => {
    const id = req.query.id
    const result = await services.deletePrice(id)
    const {message,isSuccess,status} = result
    return res.status(status).json({message,isSuccess})
  },
  getProductLine: async (req,res) =>{
    const query = req.query
    const result = await services.getProductLine(query)
    const {isSuccess,status} = result
    if(isSuccess){
        const {productLines} = result
        return res.status(status).json({isSuccess,productLines})
    }
    const {message} = result
    return res.status(status).json({message,isSuccess})
  }
};

module.exports = PriceController;
