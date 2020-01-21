import db from '../src/models'
import {Op} from 'sequelize'

class BlogService {
  static async getAllBlogs(limit, offset) {
    try {
      if (limit && !offset) {
        return await db.Blog.findAll({limit})
      }
      else if (!limit && offset) {
        return await db.Blog.findAll({ offset })
      }
      else if (limit && offset) {
        return await db.Blog.findAll({ limit, offset })
      }
      else {
        return await db.Blog.findAll()
      }
    } catch (err) { throw err }
  }

  static async getBlogById(id) {
    try {
      return await db.Blog.findOne({ where: { id: Number(id) } })
    } catch (err) {
      throw err
    }
  }

  static async getBlogByTitle(title) {
    try {
      return await db.Blog.findOne({ where: { title: { [Op.iLike]: `%${title}`} } })
    } catch (err) { throw err }
  }

  static async addBlog(newBlog) {
    try {
      return await db.Blog.create(newBlog)
    } catch (err) {
      throw err
    }
  }

  static async updateBlog(id, updateBlog) {
    try {
      const blogToUpdate = await db.Blog.findOne({ where: { id: Number(id) } })

      if (blogToUpdate) {
        await db.Blog.update(updateBlog, {
          where: { id: Number(id) }
        })
        return updateBlog
      } return null
    } catch (err) {
      throw err
    }
  }

  static async deleteBlog(id) {
    try {
      const blogToDelete = await db.Blog.findOne({ where: { id: Number(id) } })

      if (blogToDelete) return await db.Blog.destroy({ where: { id: Number(id) } })
      return null
    } catch (err) {
      throw err
    }
  }

  static async deleteAllBlogs() {
    try {
      return await db.Blog.destroy({ where: {} })
    } catch (err) {
      throw err
    }
  }
}

export default BlogService