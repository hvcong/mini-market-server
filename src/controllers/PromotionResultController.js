const services = require('../services/PromotionResultServices')

const controller  = {
    create: async( req,res) =>{
        const data = req.body
        const {isSuccess,status,message,result} = await services.create(data)
        if(isSuccess){
            return res.status(status).json({isSuccess,result})
        }
        return res.status(status).json({isSuccess,message})
    },
    getAll: async (req,res) =>{
        const {query} = req
        const {isSuccess,status,message,results} = await services.getAll(query)
        if(isSuccess){
            return res.status(status).json({isSuccess,results})
        }
        return res.status(status).json({isSuccess,message})
    },
    getById: async(req,res) =>{
        const {query}  = req
        const {isSuccess,status,message,result} = await services.getById(query)
        if(isSuccess){
            return res.status(status).json({isSuccess,result})
        }
        return res.status(status).json({isSuccess,message})
    }
}

module.exports = controller