const services = require('../services/EmployeeServices')
const controller = {
    add: async (req,res) =>{
        const data = req.body
        const result = await services.createEmployee(data)
        const {isSuccess,employee,message,status} = result
        if(isSuccess){
            return res.status(status).json({isSuccess,employee})
        }
        return res.status(status).json({isSuccess,message})
    },
    getByPhone: async (req,res) =>{
        const phonenumber = req.query.phonenumber
        const result = await services.getByPhonenumber(phonenumber)
        const {isSuccess,status,employee,message} = result
        if(isSuccess){
            return res.status(status).json({isSuccess,employee})
        }
        return res.status(status).json({isSuccess,message})
    },
    get: async (req,res) =>{
        const {query} = req
        const {isSuccess,status,employees,message} = await services.get(query)
        if(isSuccess){
            return res.status(status).json({isSuccess,employees})
        }
        return res.status(status).json({isSuccess,message})
    }
}
module.exports = controller