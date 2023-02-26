const routes = require('express').Router()
const ProductLineController = require('../controllers/ProductLineController')

routes.post('/add',ProductLineController.addNewProLine)
routes.put('/update/:id',ProductLineController.updateProductLine)
routes.get('/getById/:id',ProductLineController.getProductLineById)
routes.get('/getByName',ProductLineController.getProductLineByName)
routes.get('/getByCategory',ProductLineController.getProductLineByCategory)

module.exports = routes