import db from '../src/models'

class UserService {
  static async addUser(user) {
    try {
      return await db.Users.create(user)
    } catch (err) { throw err }
  }

  static async getUser(username) {
    try {
      return await db.Users.findOne({ where: { username } })
    } catch (err) { throw err }
  }

  static async getUserById(id) {
    try {
      return await db.Users.findOne({ where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async updateUser(id, updateUser) {
    try {
      await db.Users.update(updateUser, { where: { id: Number(id) } })
      return updateUser
    } catch (err) { throw err }
  }

  static async updatePassword(id, updatePassword) {
    try {
      return await db.Users.update(
        { password: updatePassword },
        { where: { id: Number(id) } })
    } catch (err) { throw err }
  }

  static async deleteUser(id) {
    try {
      return await db.Users.destroy({ where: { id: Number(id) } })
    } catch (error) { throw err }
  }
}

export default UserService