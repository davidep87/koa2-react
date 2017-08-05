/**
* @fileOverview Endpoint for Dashboard Settings managment
* @module Settings
*/
const be = require('bejs')
/**
 * Endpoint: /api/settings
 * Method: POST
 * @function
 * @name findOrCreate
 * @param  {string} token
 * @return {object} settings all info saved in general settings
 */
exports.settings = async function settings(ctx, next){

  if(be.empty(ctx.request.body.settings))
    return ctx.body = ctx.errors.REQUIRED_PARAMS_EMPTY

  let settings = await ctx.db.models.Settings
    .findOrCreate({ where: { id: 1 }, defaults: ctx.request.body.settings}).then((setting, created) => {
      if(created === undefined)
        return created;
    })

  if(settings === undefined)
    settings = await ctx.db.models.Settings.update(ctx.request.body.settings, { where: { id: 1 }, returning: true, plain: true }).then((result) => {
      return ctx.db.models.Settings.findOne({ where: { id: 1 } }).then((result) => result )
    })

  ctx.body = settings
}

/**
 * Endpoint: /api/settings/get
 * Method: POST
 * @function
 * @name get
 * @param  {string} token
 * @return {object} settings all info saved in general settings
 */
exports.settings = async function getSettings(ctx, next){
  const settings = await ctx.db.models.Settings.findOne({
    where: { id: 1 },
    attributes: { exclude: ['id', 'image', 'createdAt', 'updatedAt'] }
  })
  ctx.body = settings
}
