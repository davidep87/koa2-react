const router = require('koa-router')()
const body = require('koa-body')()

/**
* @fileOverview Endpoint for Authorization
* @module Auth
*/

router
  .post('/login', body, login)
  .post('/logout', body, logout)

/**
 * Endpoint: /api/login
 * Method: POST
 * @param  {string} username username
 * @param  {string} password user password
 * @return {object} data contain isLogged (boolean), token (string), message (string)
 */
async function login(ctx){

  const user = await ctx.db.models.User.findOne({ where: { "username": ctx.request.body.username } }).then((result) => result)
  let isLogged = false
  let token = null
  let message = ''

  if (user){
    isLogged = await comparePassword(user, ctx.request.body.password)
    if(isLogged){
      token = await ctx.auth.createToken(user.id)
      const session = { user: user.id, token, exp: new Date().getTime() + (360000 * 24 * 30) }
      await ctx.auth.insert(session)
    } else {
      message = ctx.errors.LOGIN_ERROR2
    }
  } else {
     message = ctx.errors.LOGIN_ERROR3
  }

  ctx.body = { isLogged, token, message }
}

/**
 * Endpoint: /api/logout
 * Method: POST
 * @param  {string} token token released after login
 * @return {object} data contain success (boolean), isLogged (boolean) should be always false
 */
async function logout(ctx){
  await ctx.auth.deleteToken(ctx.request.body.token)
  ctx.body = { "success": true, "isLogged" : false }
}

async function comparePassword(user, password){
  return new Promise((resolve, reject) => {
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        reject(err); return;
      }
      resolve(isMatch)
    })
  })
}

module.exports = router
