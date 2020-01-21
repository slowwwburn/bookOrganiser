import db from '../src/models'
import { Op } from 'sequelize'

class NewsletterService {
  static async getAllNewsletters(limit, offset) {
    try {
      if (limit && !offset) {
        return await db.Newsletter.findAll({ limit })
      }
      else if (!limit && offset) {
        return await db.Newsletter.findAll({ offset })
      }
      else if (limit && offset) {
        return await db.Newsletter.findAll({ limit, offset })
      }
      else {
        return await db.Newsletter.findAll()
      }
    } catch (err) { throw err }
  }

  static async getNewsletterById(id) {
    try {
      return await db.Newsletter.findOne({ where: { id: Number(id) } })
    } catch (err) {
      throw err
    }
  }

  static async getNewsletterBySubject(subject) {
    try {
      return await db.Newsletter.findOne({ where: { subject: { [Op.iLike]: `%${subject}` } } })
    } catch (err) { throw err }
  }

  static async addNewsletter(newNewsletter) {
    try {
      return await db.Newsletter.create(newNewsletter)
    } catch (err) {
      throw err
    }
  }

  static async updateNewsletter(id, updateNewsletter) {
    try {
      const newsletterToUpdate = await db.Newsletter.findOne({ where: { id: Number(id) } })

      if (newsletterToUpdate) {
        await db.Newsletter.update(updateNewsletter, {
          where: { id: Number(id) }
        })
        return updateNewsletter
      } return null
    } catch (err) {
      throw err
    }
  }

  static async deleteNewsletter(id) {
    try {
      const newsletterToDelete = await db.Newsletter.findOne({ where: { id: Number(id) } })

      if (newsletterToDelete) return await db.Newsletter.destroy({ where: { id: Number(id) } })
      return null
    } catch (err) {
      throw err
    }
  }

  static async deleteAllNewsletters() {
    try {
      return await db.Newsletter.destroy({ where: {} })
    } catch (err) {
      throw err
    }
  }
}

export default NewsletterService