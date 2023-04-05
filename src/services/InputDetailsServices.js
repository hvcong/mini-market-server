const {InputDetail} = require('../config/persist')

const services = {
    createManyDetails: async (data) =>{
        try {
            const inputDetails = await InputDetail.bulkCreate(data)
            return inputDetails            
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = services