const router = require('koa-router')()
const body = require('koa-body')()
const auth = require('../helpers/middleware')
const { login, logout, restorePassword, generatePassword } = require('./auth')
const { settings, getSettings } = require('./settings')

router
  // Auth
  .post('/login', body, login)
  .post('/logout', body, logout)
  .post('/login/restore/', body, restorePassword)
  .get('/login/restore/:token', body, generatePassword)
  // Settings
  .post('/settings', body, auth(true), settings)
  .post('/settings/get', body, auth(true), getSettings)

module.exports = router
