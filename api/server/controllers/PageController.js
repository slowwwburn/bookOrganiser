import PageService from '../services/PageService'
import Util from '../utils/Utils'

const util = new Util()

class PageController {
  static async getAllPages(req, res) {
    const { limit, offset } = req.query
    try {
      const pages = await PageService.getAllPages(limit, offset)
      if (pages.length < 1) {
        util.setSuccess(200, 'No page found', pages)
        return util.send(res)
      }
      if (limit && !offset) {
        util.setSuccess(200, `${pages.length} pages retrieved`, pages)
      }
      else if (!limit && offset) {
        util.setSuccess(200, `Retrieved all pages starting from position ${offset}`, pages)
      }
      else if (limit && offset) {
        util.setSuccess(200, `Retrieved ${pages.length} pages starting from position ${offset}`, pages)
      }
      else {
        util.setSuccess(200, `All pages retrieved`, pages)
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async getPageByName(req, res) {
    const name = req.query.name.replace(/_/g, ' ')
    try {
      const thePage = await PageService.getPageByName(name)
      if (!thePage) util.setError(404, `Cant find page with name: ${name}`)
      else util.setSuccess(200, 'Page found', thePage)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async addPage(req, res) {
    let newPage = req.body
    console.log(newPage)
    if (!newPage.name || !newPage.route || !newPage.attributes) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const exists = await PageService.getPageByName(newPage.name)
    if (exists) {
      util.setError(400, `Page with name: ${newPage.name}, already exists`)
      return util.send(res)
    }
    const { images } = newPage.attributes
    if (images) {
      images.foreach(image => {
        image = imageConverter(image)
      })
      newPage.attributes.images = image
    }
    try {
      const createdPage = await PageService.addPage(newPage)
      util.setSuccess(201, 'Page Added!', createdPage)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async updatePage(req, res) {
    const alteredPage = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    if (!newPage.name) {
      util.setError(400, 'Please provide correct details')
      return util.send(res)
    }
    const { images } = alteredPage.attributes
    if (images) {
      images.foreach(image => {
        image = imageConverter(image)
      })
      alteredPage.attributes.images = image
    }
    try {
      const updatedPage = await PageService.updatePage(id, alteredPage)
      if (!updatedPage) {
        util.setError(404, `Cannot find page with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Page updated', updatedPage)
        console.log(updatedPage)
      }
      return util.send(res)
    } catch (err) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async deletePage(req, res) {
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }
    try {
      const pageToDelete = await PageService.addPageById(id)
      if (!pageToDelete) {
        util.setError(404, `page with the id ${id} cannot be found`)
        return util.send(res)
      }
      const deleted = await PageService.deletePage(id) 
      if (!deleted) util.setError(400, err.message)
      else {
        util.setSuccess(200, 'Page deleted', pageToDelete)
        util.fileRemoval(pageToDelete.attributes.image);
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }
}

export default PageController