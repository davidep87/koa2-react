const config = require('../config/config.js')

module.exports = function(auth){

  return async function(ctx, next){

    if(auth){
      if(!ctx.request.body.token)
        return { "isLogged" : false, "token": false , "message": ctx.errors.LOGIN_ERROR }

      let forcedUpdate = ctx.request.body.forcedUpdate ? true : false
      let status = await ctx.auth.check(ctx.request.body.token, ctx.errors, forcedUpdate)

      if(!status.isLogged)
        return ctx.body = status

      if(status.updated)
        ctx.set('token', `${status.token}`)
    }

    for(let header of Object.entries(config.cors.headers)){
      ctx.set(header[0], header[1])
    }

    await next()
  }

}
