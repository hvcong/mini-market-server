const routes = require('express').Router()
const controller = require('../controllers/EmployeeController')

routes.post('/add',controller.add)
routes.get('/phone',controller.getByPhone)

module.exports = routes