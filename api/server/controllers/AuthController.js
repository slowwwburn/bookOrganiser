import configJson from '../src/config/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import authService from '../services/AuthService'
import userService from '../services/UserService'
import Util from '../utils/Utils'

const util = new Util()
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];
class AuthController {
  static async login(req, res) {
    try {
      const data = await authService.authenticate(req.body)
      let { message, token, status } = data
      if(status != 200)  util.setError(status, message)
      else util.setSuccess(status, message, token)
      return util.send(res);
    } catch (err) {
      throw err
    }
  }

  static async register(req, res) {
    const username = req.body.username
    try {
      const exists = await userService.getUserOnLogin(username || '')
      if (exists) {
        util.setSuccess(200, 'Registration failed. Email already exists')
        return util.send(res)
      }
      const user = {
        username,
        password: bcrypt.hashSync(req.body.password, config.saltRounds)
      }
      const createdUser = await userService.addUser(user)
      util.setSuccess(201, 'User created', createdUser)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }
}

export default AuthController
