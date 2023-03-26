const routes = require('express').Router()
const controller = require('../controllers/DiscountRateProduct')

routes.post('/add',controller.add)
routes.get('/get',controller.get)
routes.put('/update',controller.update)
routes.get('/getId',controller.getById)

module.exports = routes