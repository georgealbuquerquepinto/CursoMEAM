const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

  //ROTAS ABERTAS
  const openApi = express.Router()
  server.use('/oapi', openApi)

  const AuthService = require('../api/user/authService')
  openApi.post('/login', AuthService.login)
  openApi.post('/signup', AuthService.signup)
  openApi.post('/validateToken', AuthService.validateToken)

  // ROTAS PROTEGIDAS POR TOKEN JWT
  const protecedApi = express.Router()
  server.use('/api', protecedApi)

  protecedApi.use(auth)

  const billingCycleService = require('../api/billingCycle/billingCycleService')
  billingCycleService.register(protecedApi, '/billingCycles')

  const billingSummaryService = require('../api/billingSummary/billingSummaryService')
  protecedApi.route('/billingSummary').get(billingSummaryService.getSummary)
}