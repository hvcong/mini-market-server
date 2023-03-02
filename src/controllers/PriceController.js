const services = require("../services/PriceServices");

const PriceController = {
  addPrice: async (req, res) => {
    const data = req.body;
    const result = await services.addPrice(data);
    const { isSuccess, status } = result;
    if (isSuccess) {
      const { prodPrice } = result;
      return res.status(status).json({ isSuccess, prodPrice });
    } else {
      const { message } = result;
      return res.status(status).json({ message, isSuccess });
    }
  },
  updatePrice: async (req, res) => {
    const data = req.body;
    const result = await services.updatePrice(data);
    const { message, isSuccess, status } = result;
    return res.status(status).json({ message, isSuccess });
  },
  deletePrice: async (req, res) => {
    const pid = req.params.pid
    const uid = req.params.uid
    const result = await services.deletePrice(pid,uid)
    const {message,isSuccess,status} = result
    return res.status(status).json({message,isSuccess})
  },
  getProductLine: async (req,res) =>{
    const result = await services.getProductLine()
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
