const services = require('../services/BillServices')
const controller = {
    add: async (req,res) =>{
        const data = req.body
        const result = await services.add(data)
        const {isSuccess,bill,message,status} = result
        if(isSuccess){
            return res.status(status).json({isSuccess,bill})
        }
        return res.status(status).json({isSuccess,message})
    },
    get: async (req,res) =>{
        const {query} = req
        const {isSuccess,status,bills,message} = await services.get(query)
        if(isSuccess){
            return res.status(status).json({isSuccess,bills})
        }
        return res.status(status).json({isSuccess,message})
    }
}
module.exports = controller