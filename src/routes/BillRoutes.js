const routes = require('express').Router()
const controller = require('../controllers/BillController')

routes.post('/add',controller.add)

module.exports = routes