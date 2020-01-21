import CategoryService from '../services/CategoryService'
import Util from '../utils/Utils'

const util = new Util()

class CategoryController {
  static async getAllCategories(req, res) {
    const { limit, offset } = req.query
    try {
      const Categories = await CategoryService.getAllCategorys(limit, offset)
      if (Categories.length < 1) {
        util.setSuccess(200, 'No Category found', Categories)
        return util.send(res)
      }
      if (limit && !offset) {
        util.setSuccess(200, `${Categories.length} Categories retrieved`, Categories)
      }
      else if (!limit && offset) {
        util.setSuccess(200, `Retrieved all Categories starting from position ${offset}`, Categories)
      }
      else if (limit && offset) {
        util.setSuccess(200, `Retrieved ${Categories.length} Categories starting from position ${offset}`, Categories)
      }
      else {
        util.setSuccess(200, `All Categories retrieved`, Categories)
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async getCategoryByTitle(req, res) {
    const title = req.query.title.replace(/_/g, ' ')
    try {
      const theCategory = await CategoryService.getCategoryByTitle(title)
      if (!theCategory) util.setError(404, `Cant find Category with title: ${title}`)
      else util.setSuccess(200, 'Category found', theCategory)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async addCategory(req, res) {
    let newCategory = req.body
    console.log(newCategory)
    if (!newCategory.title) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const exists = await CategoryService.getCategoryByTitle(newCategory.title)
    if (exists) {
      util.setError(400, `Category with title: ${newCategory.title}, already exists`)
      return util.send(res)
    }

    try {
      const createdCategory = await CategoryService.addCategory(newCategory)
      util.setSuccess(201, 'Category Added!', createdCategory)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async updateCategory(req, res) {
    const alteredCategory = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    if (!alteredCategory.title) {
      util.setError(400, 'Please provide correct details')
      return util.send(res)
    }
    try {
      const updatedCategory = await CategoryService.updateCategory(id, alteredCategory)
      if (!updatedCategory) {
        util.setError(404, `Cannot find Category with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Category updated', updatedCategory)
        console.log(updatedCategory)
      }
      return util.send(res)
    } catch (err) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async deleteCategory(req, res) {
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }
    try {
      const CategoryToDelete = await CategoryService.deleteCategory(id)
      if (!CategoryToDelete) {
        util.setError(404, `Category with the id ${id} cannot be found`)
      } else {
        util.setSuccess(200, 'Category deleted')
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async deleteAllCategories(req, res) { }
}

export default CategoryController