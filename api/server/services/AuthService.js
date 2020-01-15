import db from '../src/models'
import Util from '../utils/Utils'

const util = new Util()

class AuthService {
  static async authenticate(params) {
    try {
      console.log("Data gotten")
      const user = await db.Users.findOne({
        where: { username: params.username },
        raw: true
      })
      if (!user) return { message: 'Authentication failed. User not found.', status: 404 }
      const password = util.comparePassword(params.password, user.password)
      if (!password) return { message: 'Authentication failed. Wrong password.', status: 400 }
      else {
        const payload = {
          username: user.usernmae,
          id: user.id,
          time: new Date()
        }
        const token = util.generateToken(payload)
        return { token: { token }, message: "Authentication Successful", status: 200 }
      }
    } catch (err) { throw err }
  }
}

export default AuthService
