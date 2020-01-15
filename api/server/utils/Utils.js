import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import database from '../src/models'
import configJson from '../src/config/config'

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];

export default class Util {
  constructor() {
    this.statusCode = null
    this.type = null
    this.data = null
    this.message = null
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
    this.type = 'success'
  }

  setError(statusCode, message) {
    this.statusCode = statusCode
    this.message = message
    this.type = 'error'
  }

  send(res) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data
    }

    if (this.type === 'success') {
      return res.status(this.statusCode).json(result)
    }


    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message
    })
  }

  hashPassword(password) {
    try {
      return bcrypt.hashSync(password, config.saltRounds)
    } catch (err) { throw err }
  }

  comparePassword(password, passwordHash) {
    try {
      const result = bcrypt.compareSync(password || '', passwordHash)
      return result
    } catch (err) { throw err }
  }

  generateToken(params) {
    try {
      const token = jwt.sign(params, config.jwtSecret, { expiresIn: config.tokenExpireTime })
      return token
    } catch (err) { throw err }
  }

  verifyToken(token) {
    try {
      const verify = jwt.verify(token, process.env.SECRET_KEY);
      return verify;
    } catch (err) { throw err }
  }
}