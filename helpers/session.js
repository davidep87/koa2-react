const jws = require('jws')
const redis = require('redis')
const client = redis.createClient()

class Session {
  /**
   * constructor config
   * @param  {string} secret a secret key used to generate the token
   * @param  {string} serverHost the hostname of the server
   */
  constructor(config){
    this.secret = config.secret
    this.server = config.serverHost
  }

  /**
   * insert session
   * @param  {int}  session.user id of the user
   * @param  {string}  session.token generated token
   * @param  {unixtime}  session.exp expiration time of token
   */
  async insert(session){
    await client.hmset(session.user, 'token', `${session.token}`, 'exp', `${session.exp}`, 'type', `${session.type}`)
    await client.expireat(session.user, session.exp, function (err, didSetExpiry) {
        console.log('set exp => ', didSetExpiry)
    })
  }

  /**
   * deleteToken description
   * @param  {type}  token [user token]
   */
  async deleteToken(token){
    const decoded = await this.decodeToken(token)
    await client.del(decoded.id)
  }

  /**
   * check the token status
   * @param  {string}  token        user token
   * @param  {object}  error        internal error list params
   * @param  {boolean} forcedUpdate if true the token will be automatically refreshed when is expired
   * @return {Object}  isLogged: boolean, token: 'string', message: 'string', updated: boolean
   */
  async check(token, error, forcedUpdate){

    let isLogged = true
    let message = null
    let updated = false

    const decodedToken = await this.decodeToken(token)

    if(!decodedToken){

      isLogged = false
      message = error.TOKEN_NOT_VALID

    } else {

      if(new Date(decodedToken.exp).getTime() <  new Date().getTime()){
        if(forcedUpdate){
          const decoded = await this.decodeToken(token)
          await client.del(`${decoded.id}`)
          token = await this.createToken(decodedToken.id)
          const time = new Date()
          time.setMinutes(time.getMinutes() + 480)
          await client.hmset(decodedToken.id, 'token', token, 'exp', time)
          updated = true
          message = error.TOKEN_UPDATED
        } else {
          isLogged = false
          message = error.TOKEN_NOT_VALID
        }
      } else {
        message = error.TOKEN_IS_VALID
      }
    }

    return { isLogged, token, message, updated }
  }

  /**
   * createToken
   * @param  {type}  id user id or anything that you like to use as identificator
   * @return {string}   token
   */
  async createToken(id) {
    const time = new Date()
    time.setMinutes(time.getMinutes() + 480)
    const payload = {
      iss: this.serverIp,
      exp: time,
      id: id,
    }
    const token = await jws.sign({ header: { alg: 'HS256' }, payload: payload, secret: this.secret })
    return token
  }

  /**
   * decodeToken return the information crypted inside the token
   * @param  {type}    token description
   * @return {decoded} contain serverHost, expiration date and an identificator
   */
  async decodeToken(token) {
  	let decoded = false
    try {
      await jws.verify(String(token), 'HS256', String(this.secret))
  		decoded = await jws.decode(token)
  		decoded = JSON.parse(decoded.payload)
  	}
  	catch(error) {
      if(error){
        return false
      }
    }
  	return decoded
  }

}

module.exports = Session
