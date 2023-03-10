const {Employee} = require('../config/persist')

const services = {
    createEmployee: async (data) =>{
        try {
            const {phonenumber} = data
            var employee = await Employee.findOne({where: {phonenumber: phonenumber}})
            if(employee){
                return {message: 'employee already exists',isSuccess: false, status: 403}
            }
            employee = await Employee.create(data)
            return {employee,isSuccess: true, status: 200}
        } catch (error) {
            console.log(error)
            return {message:'something went wrong',isSuccess:false, status: 500}
        }
    },
    getByPhonenumber: async(phonenumber) =>{
        try {
            const employee = await Employee.findOne({where: {phonenumber: phonenumber}})
            if(employee){
                return {employee,isSuccess: true, status: 200}
            }
            return {message:'employee not found', isSuccess:false, status: 404}
        } catch (error) {
            console.log(error)
            return {message: 'something went wrong',isSuccess: false, status: 500}
        }
    }
}
module.exports = services