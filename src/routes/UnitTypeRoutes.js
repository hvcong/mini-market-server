const routes = require('express').Router()
const controller = require('../controllers/UnitTypeController')

routes.post('/addUnit',controller.addUnit)
routes.put('/updateUnit/:id',controller.updateUnit)
routes.delete('/deleteUnit/:id',controller.deleteUnit)

module.exports = routes