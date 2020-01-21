import BlogService from '../services/BlogService'
import Util from '../utils/Utils'

const util = new Util()

class BlogController {
  static async getAllBlogs(req, res) {
    const { limit, offset } = req.query
    try {
      const Blogs = await BlogService.getAllBlogs(limit, offset)
      if (Blogs.length < 1) {
        util.setSuccess(200, 'No Blog found', Blogs)
        return util.send(res)
      }
      if (limit && !offset) {
        util.setSuccess(200, `${Blogs.length} Blogs retrieved`, Blogs)
      }
      else if (!limit && offset) {
        util.setSuccess(200, `Retrieved all Blogs starting from position ${offset}`, Blogs)
      }
      else if (limit && offset) {
        util.setSuccess(200, `${Blogs.length} Blogs retrieved`, Blogs)
      }
      else {
        util.setSuccess(200, `All Blogs retrieved`, Blogs)
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async getBlogByTitle(req, res) {
    const title = req.query.title.replace(/_/g, ' ')
    try {
      const theBlog = await BlogService.getBlogByTitle(title)
      if (!theBlog) util.setError(404, `Cant find blog with title: ${title}`)
      else util.setSuccess(200, 'Blog found', theBlog)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async addBlog(req, res) {
    let newBlog = req.body
    console.log(newBlog)
    const exists = await BlogService.getBlogByTitle(newBlog.title)
    if (exists) {
      util.setError(400, `Blog with title: ${newBlog.title}, already exists`)
      return util.send(res)
    }
    newBlog.date = new Date()
    // console.log(newBlog)
    newBlog.image = util.imageConverter(newBlog.image)
    if (!newBlog.title || !newBlog.author || !newBlog.content || !newBlog.date || !newBlog.image) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    try {
      const createdBlog = await BlogService.addBlog(newBlog)
      util.setSuccess(201, 'Blog Added!', createdBlog)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async updateBlog(req, res) {
    const alteredBlog = req.body
    alteredBlog.date = new Date()
    if (alteredBlog.image) alteredBlog.image = imageConverter(alteredBlog.image)
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updatedBlog = await BlogService.updateBlog(id, alteredBlog)
      if (!updatedBlog) {
        util.setError(404, `Cannot find blog with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Blog updated', updatedBlog)
        console.log(updatedBlog)
      }
      return util.send(res)
    } catch (err) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async deleteBlog(req, res) {
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }
    try {
      const blogToDelete = await BlogService.getBlogById(id)
      if (!blogToDelete) {
        util.setError(404, `Blog with the id ${id} cannot be found`)
        return util.send(res)
      }
      const deleted = await BlogService.deleteBlog(id)
      if (!deleted) {
        util.setError(404, err.message)
      } else {
        util.setSuccess(200, 'Blog deleted', blogToDelete)
        util.fileRemoval(blogToDelete.image.data);
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async deleteAllBlogs(req, res) { }
}

export default BlogController