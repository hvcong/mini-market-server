const services = require('../services/ListPricesHeaderServices')

const controller = {
    add: async (req,res) =>{
        const data = req.body
        const result = await services.add(data)
        const {isSuccess,status,header,message} = result
        if(isSuccess){
            return res.status(status).json({isSuccess,header})
        }
        return res.status(status).json({isSuccess,message})
    },
    update: async (req,res) =>{
        const id = req.query.id
        const data = req.body
        const result = await services.update(id,data)
        const {isSuccess,message,status} = result 
        return res.status(status).json({isSuccess,message})
    },
    delete: async( req,res) =>{
        const id = req.query.id
        const {isSuccess,message,status} = await services.delete(id)
        return res.status(status).json({isSuccess,message})
    },
    get: async(req,res) =>{
        const query = req.query
        const result = await services.get(query)
        const {isSuccess,status,headers,message} = result
        if(isSuccess){
            return res.status(status).json({isSuccess,headers})
        }
        return res.status(status).json({isSuccess,message})
    }
}
module.exports = controller