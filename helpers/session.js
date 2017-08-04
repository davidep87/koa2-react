const be = require('bejs')
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
   * insert admin session
   * @param  {int}  session.user id of the user
   * @param  {string}  session.token generated token
   * @param  {unixtime}  session.exp expiration time of token
   */
  async insert(session){
    await client.set(`${session.user}`, `${session.token}`, redis.print)
    await client.expireat(`${session.user}`, session.exp, function (err, didSetExpiry) {
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
   * @return {Object}  isLogged: boolean, token: 'string', message: 'string', updated: boolean
   */
  async check(token, error){

    let isLogged = false
    let message = null

    const decoded = await this.decodeToken(token)

    if(!decoded){

      message = error.TOKEN_NOT_VALID
      return { isLogged, token, message }

    } else {

      if(be.past(new Date(decoded.exp))){

        await client.del(`${decoded.id}`)
        message = error.TOKEN_NOT_VALID
        return { isLogged, token, message }

      } else {

       const storedToken = await this.retrieveKey(decoded.id)

       if(storedToken === token)
         isLogged = true

       return { isLogged, token, message }

      }
    }
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

  /**
   * retrieveKey return the information crypted inside the token
   * @param  {key}     id that we want search
   * @return {object}  return value or error
   */
  async retrieveKey(key) {

    return new Promise((resolve, reject) => {
      client.get(`${key}`, function (err, value){
         if (err){
           reject(err)
           return
         }
         resolve(value)
      })
    })

  }

}

module.exports = Session
