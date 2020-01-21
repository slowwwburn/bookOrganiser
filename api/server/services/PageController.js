import db from '../src/models'
import { Op } from 'sequelize'

class PageService {
  static async getAllPages(limit, offset) {
    try {
      if (limit && !offset) {
        return await db.Page.findAll({ limit })
      }
      else if (!limit && offset) {
        return await db.Page.findAll({ offset })
      }
      else if (limit && offset) {
        return await db.Page.findAll({ limit, offset })
      }
      else {
        return await db.Page.findAll()
      }
    } catch (err) { throw err }
  }

  static async getPageById(id) {
    try {
      return await db.Page.findOne({ where: { id: Number(id) } })
    } catch (err) {
      throw err
    }
  }

  static async getPageByName(name) {
    try {
      return await db.Page.findOne({ where: { name: { [Op.iLike]: `%${name}` } } })
    } catch (err) { throw err }
  }

  static async addPage(newPage) {
    try {
      return await db.Page.create(newPage)
    } catch (err) {
      throw err
    }
  }

  static async updatePage(id, updatePage) {
    try {
      const PageToUpdate = await db.Page.findOne({ where: { id: Number(id) } })

      if (PageToUpdate) {
        await db.Page.update(updatePage, {
          where: { id: Number(id) }
        })
        return updatePage
      } return null
    } catch (err) {
      throw err
    }
  }

  static async deletePage(id) {
    try {
      const PageToDelete = await db.Page.findOne({ where: { id: Number(id) } })

      if (PageToDelete) return await db.Page.destroy({ where: { id: Number(id) } })
      return null
    } catch (err) {
      throw err
    }
  }

  static async deleteAllPages() {
    try {
      return await db.Page.destroy({ where: {} })
    } catch (err) {
      throw err
    }
  }
}

export default PageService