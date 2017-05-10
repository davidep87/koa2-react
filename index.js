const http2 = require('http2')
const koa = require('koa')
const body = require('koa-body')
const api = require('koa-router')()
const apiRoutes = require('./api/index')
const config = require('./config/config.js')
const sessions = require('./helpers/session.js')
const app = new koa()

app.context.auth = new sessions({ secret: `${config.secret}`, serverHost: `${config.server.ip}` })
app.context.db = require('./config/database')
app.context.errors = require('./config/errors')

api.use('/api', apiRoutes.routes())
app.use(api.routes())
app.use(api.routes())
app.use(body())

config.ssl.active? http2.createServer(config.ssl, app.callback()).listen(config.server.port) : app.listen(config.server.port)

console.log(`Server is now running on ${config.server.hostname} port: ${config.server.port}`)
