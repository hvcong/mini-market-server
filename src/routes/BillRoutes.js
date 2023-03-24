const routes = require('express').Router()
const controller = require('../controllers/BillController')

routes.post('/add',controller.add)
routes.get('/get',controller.get)
routes.get('/getId',controller.getById)

module.exports = routes