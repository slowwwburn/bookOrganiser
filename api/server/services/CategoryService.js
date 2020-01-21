import db from '../src/models'
import { Op } from 'sequelize'

class CategoryService {
  static async getAllCategories(limit, offset) {
    try {
      if (limit && !offset) {
        return await db.Category.findAll({ limit })
      }
      else if (!limit && offset) {
        return await db.Category.findAll({ offset })
      }
      else if (limit && offset) {
        return await db.Category.findAll({ limit, offset })
      }
      else {
        return await db.Category.findAll()
      }
    } catch (err) { throw err }
  }

  static async getCategoryById(id) {
    try {
      return await db.Category.findOne({ where: { id: Number(id) } })
    } catch (err) {
      throw err
    }
  }

  static async getCategoryByTitle(title) {
    try {
      return await db.Category.findOne({ where: { title: { [Op.iLike]: `%${title}` } } })
    } catch (err) { throw err }
  }

  static async addCategory(newCategory) {
    try {
      return await db.Category.create(newCategory)
    } catch (err) {
      throw err
    }
  }

  static async updateCategory(id, updateCategory) {
    try {
      const categoryToUpdate = await db.Category.findOne({ where: { id: Number(id) } })

      if (categoryToUpdate) {
        await db.Category.update(updateCategory, {
          where: { id: Number(id) }
        })
        return updateCategory
      } return null
    } catch (err) {
      throw err
    }
  }

  static async deleteCategory(id) {
    try {
      const categoryToDelete = await db.Category.findOne({ where: { id: Number(id) } })

      if (categoryToDelete) return await db.Category.destroy({ where: { id: Number(id) } })
      return null
    } catch (err) {
      throw err
    }
  }

  static async deleteAllCategories() {
    try {
      return await db.Category.destroy({ where: {} })
    } catch (err) {
      throw err
    }
  }
}

export default CategoryService