import LogService from '../services/LogService'
import Util from '../utils/Utils'

const util = new Util()

class LogController {
  static async getAllLogs(req, res) {
    const { limit, offset } = req.query
    try {
      const Logs = await LogService.getAllLogs(limit, offset)
      if (Logs.length < 1) {
        util.setSuccess(200, 'No Log found', Logs)
        return util.send(res)
      }
      if (limit && !offset) {
        util.setSuccess(200, `${Logs.length} Logs retrieved`, Logs)
      }
      else if (!limit && offset) {
        util.setSuccess(200, `Retrieved all Logs starting from position ${offset}`, Logs)
      }
      else if (limit && offset) {
        util.setSuccess(200, `${Logs.length} Logs retrieved`, Logs)
      }
      else {
        util.setSuccess(200, `All Logs retrieved`, Logs)
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async addLog(req, res) {
    let newLog = req.body
    if (!newLog.status || !newLog.message) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    try {
      const createdLog = await LogService.addLog(newLog)
      util.setSuccess(201, 'Log Added!', createdLog)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async updateLog(req, res) {
    const alteredLog = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updatedLog = await LogService.updateLog(id, alteredLog)
      if (!updatedLog) {
        util.setError(404, `Cannot find Log with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Log updated', updatedLog)
        console.log(updatedLog)
      }
      return util.send(res)
    } catch (err) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async deleteLog(req, res) {
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }
    try {
      const logToDelete = await LogService.getLogById(id)
      if (!logToDelete) {
        util.setError(404, `Log with the id ${id} cannot be found`)
        return util.send(res)
      }
      const deleted = await LogService.deleteLog(id)
      if (!deleted) {
        util.setError(404, err.message)
      } else {
        util.setSuccess(200, 'Log deleted', logToDelete)
        util.fileRemoval(logToDelete.image.data);
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }
}

export default LogController