const services = require('../services/RetrieveBillServices')

const controller = {
    add: async (req,res) =>{
        const data = req.body
        const {isSuccess,status,message,retrieve} = await services.add(data)
        if(isSuccess){
            return res.status(status).json({isSuccess,retrieve})
        }
        return res.status(status).json({isSuccess,message})
    },
    get: async (req,res) =>{
        const query = req.query
        const {isSuccess,status,message,retrieves} = await services.get(query)
        if(isSuccess){
            return res.status(status).json({isSuccess,retrieves})
        }
        return res.status(status).json({isSuccess,message})
    }
}

module.exports = controller