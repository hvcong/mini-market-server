const { Bill } = require("../config/persist");
const services = {
    add: (data) =>{
        try {
            const {orderDate,userId,voucherId} = data
        } catch (error) {
            console.log(error)
            return {message: 'something went wrong', isSuccess: false, stautus: 500}
        }
    },
}