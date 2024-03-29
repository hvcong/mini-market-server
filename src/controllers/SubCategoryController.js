const services = require('../services/SubCategoryServices')
const controller = {
    add: async (req,res) =>{
        const data = req.body
        const result = await services.add(data)
        const {isSuccess,status,sub,message} = result
        if(isSuccess){
            return res.status(status).json({isSuccess,sub})
        }
        return res.status(status).json({isSuccess, message})
    },
    update: async (req,res) =>{
        const id = req.query.id
        const data = req.body
        const result = await services.update(id,data)
        const {isSuccess,status,message} = result       
        return res.status(status).json({isSuccess, message})
    },
    get: async (req,res) =>{
        const query = req.query
        const result = await services.get(query)
        const {isSuccess,status,subs,message} = result
        if(isSuccess){
            return res.status(status).json({isSuccess,subs})
        }
        return res.status(status).json({isSuccess, message})
    },
    getById: async (req,res) =>{
        const id = req.query.id
        const {status,isSuccess,message,subCategory} = await services.getById(id)
        if(isSuccess){
            return res.status(status).json({isSuccess,subCategory})
        }
        return res.status(status).json({isSuccess,message})
    },
    getByName: async (req,res) =>{
        const {query} = req
        const {isSuccess,status,message,subCategories} = await services.getByName(query)
        if(isSuccess){
            return res.status(status).json({isSuccess,subCategories})
        }
        return res.status(status).json({isSuccess,message})
    },
    getByState: async (req,res) =>{
        const {query} = req
        const {isSuccess,status,message,subCategories} = await services.getByState(query)
        if(isSuccess){
            return res.status(status).json({isSuccess,subCategories})
        }
        return res.status(status).json({isSuccess,message})
    },
    getByCateId: async (req,res) =>{
        const {query} = req
        const {isSuccess,status,message,subCategories} = await services.getByCateId(query)
        if(isSuccess){
            return res.status(status).json({isSuccess,subCategories})
        }
        return res.status(status).json({isSuccess,message})
    }
}
module.exports = controller