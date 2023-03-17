const routes = require('express').Router()

const controller = require('../controllers/ListPricesHeaderController')
routes.post('/add',controller.add)
routes.put('/update',controller.update)
routes.delete('/delete',controller.delete)
routes.get('/get',controller.get)
routes.get('/getId',controller.getById)

module.exports = routes