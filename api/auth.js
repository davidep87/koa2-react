/**
* @fileOverview Endpoint for Authorization
* @module Auth
*/

/**
 * Endpoint: /api/login
 * Method: POST
 * @param  {string} username username
 * @param  {string} password user password
 * @return {object} data contain isLogged (boolean), token (string), message (string)
 */
exports.login = async function login(ctx){

  if(be.empty(ctx.request.body.username))
    return ctx.body = ctx.errors.REQUIRED_PARAMS_EMPTY

  const user = await ctx.db.models.User.findOne({ where: { "username": ctx.request.body.username } }).then((result) => result)
  let isLogged = false
  let token = null
  let message = ''

  if (be.not.empty(user)){
    isLogged = await comparePassword(user, ctx.request.body.password)
    if(be.booleanTrue(isLogged)){
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
exports.logout = async function logout(ctx){
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
