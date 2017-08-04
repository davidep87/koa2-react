const config = require('../config/config')

module.exports = function(auth){

  return async function(ctx, next){

    if(auth){
      if(!ctx.request.body.token)
        return ctx.body = { isLogged : false, token: false , message: ctx.errors.LOGIN_ERROR }

      let status = await ctx.auth.check(ctx.request.body.token, ctx.errors)

      if(!status.isLogged)
        return ctx.body = { isLogged : false, token: false , message: ctx.errors.TOKEN_NOT_UPDATED }

    }

    for(let header of Object.entries(config.cors.headers)){
      ctx.set(header[0], header[1])
    }

    await next()
  }

}
