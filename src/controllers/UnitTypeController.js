const services = require('../services/UnitTypeServices')
const UnitTypeController = {
    addUnit : async (req,res) =>{
        const data = req.body
        const result = await services.addUnit(data)
        const {isSuccess,status} = result
        if(isSuccess){
            const {unitType} = result
            return res.status(status).json({isSuccess,unitType})
        }
        else{
            const {message} = result
            return res.status(status).json({message,isSuccess})
        }
    },
    updateUnit: async (req,res) =>{
        const id = req.query.id
        const data = req.body
        const result = await services.updateUnit(id,data)
        const {message,isSuccess,status} = result
        return res.status(status).json({ message,isSuccess})
    },
    deleteUnit: async (req,res) =>{
        const id = req.query.id
        const result = await services.deleteUit(id)
        const {message,isSuccess,status} = result
        return res.status(status).json({message,isSuccess})
    },
    getById: async (req,res) =>{
        const id = req.query.id
        const {status,isSuccess,message,unitType} = await services.getUnitById(id)
        if(isSuccess){
            return res.status(status).json({isSuccess,unitType})
        }
        return res.status(status).json({isSuccess,message})
    },
    getByProductId: async (req,res) =>{
        const productId = req.query.productId
        const {isSuccess,status,message,unitTypes} = await services.getUnitByProductId(productId)
        if(isSuccess){
            return res.status(status).json({isSuccess,unitTypes})
        }
        return res.status(status).json({isSuccess,message})
    },
    getAll: async( req,res) => {
        const {isSuccess,status,message,unitTypes} = await services.getAllUnits()
        if(isSuccess){
            return res.status(status).json({isSuccess,unitTypes})
        }
        return res.status(status).json({isSuccess,message})
    },
    getLimit: async (req,res) =>{
        const {query} = req
        const {isSuccess,status,message,unitTypes} = await services.getLimit(query)
        if(isSuccess){
            return res.status(status).json({isSuccess,unitTypes})
        }
        return res.status(status).json({isSuccess,message})
    },
    getBaseUnit: async (req,res) =>{
        const {isSuccess,status,baseUnits,message} = await services.getBaseUnit()
        if(isSuccess){
            return res.status(status).json({isSuccess,baseUnits})
        }
        return res.status(status).json({isSuccess,message})
    },
    getOtherUnits: async (req,res) =>{
        const {isSuccess,status,otherUnits,message} = await services.getOtherUnits()
        if(isSuccess){
            return res.status(status).json({isSuccess,otherUnits})
        }
        return res.status(status).json({isSuccess,message})
    }
}
module.exports = UnitTypeController