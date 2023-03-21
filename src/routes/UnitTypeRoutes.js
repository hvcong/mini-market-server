const routes = require('express').Router()
const controller = require('../controllers/UnitTypeController')

routes.post('/add',controller.addUnit)
routes.put('/update',controller.updateUnit)
routes.delete('/delete',controller.deleteUnit)
routes.get('/getId',controller.getById)
routes.get('/productId',controller.getByProductId)
routes.get('/get',controller.getAll)
routes.get('/getLimit',controller.getLimit)
routes.get('/base',controller.getBaseUnit)
routes.get('/others',controller.getOtherUnits)

module.exports = routes