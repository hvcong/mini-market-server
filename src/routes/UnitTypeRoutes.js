const routes = require('express').Router()
const controller = require('../controllers/UnitTypeController')

routes.post('/add',controller.addUnit)
routes.put('/update/:id',controller.updateUnit)
routes.delete('/delete/:id',controller.deleteUnit)

module.exports = routes