import db from '../src/models'

class LogService {
  static async getAllLogs(limit, offset) {
    try {
      if (limit && !offset) {
        return await db.Log.findAll({ limit })
      }
      else if (!limit && offset) {
        return await db.Log.findAll({ offset })
      }
      else if (limit && offset) {
        return await db.Log.findAll({ limit, offset })
      }
      else {
        return await db.Log.findAll()
      }
    } catch (err) { throw err }
  }

  static async getLogById(id) {
    try {
      return await db.Log.findOne({ where: { id: Number(id) } })
    } catch (err) {
      throw err
    }
  }

  static async addLog(newLog) {
    try {
      return await db.Log.create(newLog)
    } catch (err) {
      throw err
    }
  }

  static async updateLog(id, updateLog) {
    try {
      const logToUpdate = await db.Log.findOne({ where: { id: Number(id) } })

      if (logToUpdate) {
        await db.Log.update(updateLog, {
          where: { id: Number(id) }
        })
        return updateLog
      } return null
    } catch (err) {
      throw err
    }
  }

  static async deleteLog(id) {
    try {
      const logToDelete = await db.Log.findOne({ where: { id: Number(id) } })

      if (logToDelete) return await db.Log.destroy({ where: { id: Number(id) } })
      return null
    } catch (err) {
      throw err
    }
  }
}

export default LogService