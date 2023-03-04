const { Bill,Customer, Employee } = require("../config/persist");
const services = {
    add: async (data) =>{
        try {
            const {cost,customerId,employeeId,voucherId} = data
            if(!customerId && !employeeId){
                return {message: 'missing customerId or employeeId',isSuccess: false, status: 400}
            }
            var customer = await Customer.findOne({where: {id: customerId}})
            if(!customer){
                
            }
            const bill = await Bill.create()
        } catch (error) {
            console.log(error)
            return {message: 'something went wrong', isSuccess: false, stautus: 500}
        }
    },
}