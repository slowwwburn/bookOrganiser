import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import database from '../src/models'
import configJson from '../src/config/config'
import Util from '../utils/Utils'

const util = new Util()
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];

class AuthService {
  static async authenticate(params) {
    try {
      console.log("Data gotten")
      const user = await database.Users.findOne({
        where: { username: params.username },
        raw: true
      })
      if (!user) {
        return { message: 'Authentication failed. User not found.', status: 404 }
      }
      else if (!bcrypt.compareSync(params.password || '', user.password)) {
        return { message: 'Authentication failed. Wrong password.', status: 400 }
      }
      else {
        const payload = {
          username: user.usernmae,
          id: user.id,
          time: new Date()
        }
        const token = jwt.sign(payload, config.jwtSecret, {
          expiresIn: config.tokenExpireTime
        })
        return { token:{token}, message: "Authentication Successful", status: 200 }
      }
    } catch (err) { throw err }
  }
}

export default AuthService
