import database from '../src/models'

class UserService {
  static async addUser(user) {
    try {
      return await database.Users.create(user)
    } catch (err) { throw err }
  }

  static async getUserOnLogin(username) {
    try {
      return await database.Users.findOne({ where: { username } })
    } catch (err) { throw err }
  }
}

export default UserService