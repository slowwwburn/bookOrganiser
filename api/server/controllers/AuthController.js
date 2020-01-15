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
      if (status != 200) util.setError(status, message)
      else util.setSuccess(status, message, token)
      return util.send(res);
    } catch (err) {
      throw err
    }
  }

  static async register(req, res) {
    const username = req.body.username
    try {
      const exists = await userService.getUser(username || '')
      if (exists) {
        util.setSuccess(200, 'Registration failed. Email already exists')
        return util.send(res)
      }
      const user = {
        username,
        password: await util.hashPassword(req.body.password)
      }
      const createdUser = await userService.addUser(user)
      util.setSuccess(201, 'User created', createdUser)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async updateUser(req, res) {
    const user = await userService.getUser(req.body.username)
    const updateUser = { username: req.body.newUsername }
    if (!user) {
      util.setError(400, 'User does not exist')
      return util.send(res)
    }
    const validPassword = util.comparePassword(req.body.password, user.password)
    if (!validPassword) {
      util.setError(401, 'Password is invalid')
      return util.send(res)
    }
    try {
      const updatedUser = await userService.updateUser(user.id, updateUser)
      console.log(updatedUser)
      util.setSuccess(200, 'User updated', updatedUser)
      return util.send(res)
    } catch (err) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async updatePassword(req, res) {
    const user = await userService.getUser(req.body.username)
    if (!user) {
      util.setError(400, 'User does not exist')
      return util.send(res)
    }
    const validPassword = await util.comparePassword(req.body.password, user.password)
    const newPassword = await util.hashPassword(req.body.newPassword)
    if (!validPassword) {
      util.setError(401, 'Password is invalid')
      return util.send(res)
    }
    try {
      await userService.updatePassword(user.id, newPassword)
      util.setSuccess(200, 'Password updated')
      return util.send(res)
    } catch (error) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async deleteUser(req, res) {
    const user = await userService.getUser(req.body.username)
    if (!user) {
      util.setError(400, 'User does not exist')
      return util.send(res)
    }
    try {
      const deletedUser = await userService.deleteUser(user.id)
      if (deletedUser) {
        util.setSuccess(200, 'User deleted')
        return util.send(res)
      }
    } catch (err) { 
      util.setError(400, err)
      util.send(res)
     }
  }
}

export default AuthController
