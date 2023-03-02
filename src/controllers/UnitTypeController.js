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
        const id = req.params.id
        const data = req.body
        const result = await services.updateUnit(id,data)
        const {message,isSuccess,status} = result
        return res.status(status).json({ message,isSuccess})
    },
    deleteUnit: async (req,res) =>{
        const id = req.params.id
        const result = await services.deleteUit(id)
        const {message,isSuccess,status} = result
        return res.status(status).json({message,isSuccess})
    }
}
module.exports = UnitTypeController