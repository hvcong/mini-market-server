const services = require('../services/ProductLineServices')
const ProductLineController = {
    addNewProLine: async (req,res) =>{
        try {
            const data = req.body
            const proLine = await services.addProductLine(data)
            if(proLine) {
                return res.status(200).json(proLine)
            }
            else{
                return res.status(403).json({message: "create new productline falsed",result: false})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'something goes wrong',isSuccess: false})
        }
    },
    updateProductLine: async (req,res) =>{
        try {
            const data = req.body
            const proLine = await services.updateProductLine(data)
            if(proLine){
                return res.status(200).json(proLine)
            }
            else{
                return res.status(403).json({message: 'update failed',isSuccess: false})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'something goes wrong',isSuccess: false})
        }
    },
    deleteProductLine : async (req,res) =>{
        try {
            const id = req.params.id
            const data = req.body
            const result = await services.deleteProductLine(id,data)
            if(result) {
                return res.status(200).json("deleled successful")
            }
            else{
                return res.status(404).json({message: 'productLine not found',isSuccess: false})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'something goes wrong',isSuccess: false})
        }
    },
    getProductLineByCategory: async (req,res ) =>{
        try {
            const name = req.body.name
            const products = await services.getProductLineByCategory(name)
            if(!products.length){
                return res.status(200).json(products)
            }
            else{
                return res.status(200).json({message: 'this category has not any product',isSuccess: true})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'something goes wrong',isSuccess: false})
        }
    },
    getProductLineByName: async (req,res) =>{
        try {
            const name = req.body.name
            const products = await services.getProductLineByName(name)
            if(products){
                if(!products.length){
                    return res.status(200).json(products)
                }
                else{                    
                    return res.status(200).json({messgae: 'can not find any product',isSuccess: true})
                }
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'something goes wrong',isSuccess: false})
        }
    },
    getProductLineById: async (req,res)=>{
        try {
            const id = req.params.id
            const product = services.getProductLineById(id)
            if(product){
                return res.status(200).json(product)
            }
            else{
                return res.status(200).json({message: 'can not find any product',isSuccess: true})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({messgae: 'something goes wrong',isSuccess: false})
        }
    }
}
module.exports = ProductLineController