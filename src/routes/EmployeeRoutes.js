const routes = require('express').Router()
const controller = require('../controllers/EmployeeController')

routes.post('/add',controller.add)
routes.get('/phone',controller.getByPhone)
routes.get('/get',controller.get)
routes.put('/update',controller.update)

module.exports = routes