import NewsletterService from '../services/NewsletterService'
import Util from '../utils/Utils'

const util = new Util()

class NewsletterController {
  static async getAllNewsletters(req, res) {
    const { limit, offset } = req.query
    try {
      const Newsletters = await NewsletterService.getAllNewsletters(limit, offset)
      if (Newsletters.length < 1) {
        util.setSuccess(200, 'No Newsletter found', Newsletters)
        return util.send(res)
      }
      if (limit && !offset) {
        util.setSuccess(200, `${Newsletters.length} Newsletters retrieved`, Newsletters)
      }
      else if (!limit && offset) {
        util.setSuccess(200, `Retrieved all Newsletters starting from position ${offset}`, Newsletters)
      }
      else if (limit && offset) {
        util.setSuccess(200, `Retrieved ${Newsletters.length} Newsletters starting from position ${offset}`, Newsletters)
      }
      else {
        util.setSuccess(200, `All Newsletters retrieved`, Newsletters)
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async getNewsletterBySubject(req, res) {
    const subject = req.query.subject.replace(/_/g, ' ')
    try {
      const theNewsletter = await NewsletterService.getNewsletterBySubject(subject)
      if (!theNewsletter) util.setError(404, `Cant find Newsletter with subject: ${subject}`)
      else util.setSuccess(200, 'Newsletter found', theNewsletter)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async addNewsletter(req, res) {
    let newNewsletter = req.body
    console.log(newNewsletter)
    if (!newNewsletter.subject || !newNewsletter.message) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const exists = await NewsletterService.getNewsletterBySubject(newNewsletter.subject)
    if (exists) {
      util.setError(400, `Newsletter with subject: ${newNewsletter.subject}, already exists`)
      return util.send(res)
    }

    try {
      const createdNewsletter = await NewsletterService.addNewsletter(newNewsletter)
      util.setSuccess(201, 'Newsletter Added!', createdNewsletter)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async updateNewsletter(req, res) {
    const alteredNewsletter = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    if (!alteredNewsletter.subject || !alteredNewsletter.message) {
      util.setError(400, 'Please provide correct details')
      return util.send(res)
    }
    try {
      const updatedNewsletter = await NewsletterService.updateNewsletter(id, alteredNewsletter)
      if (!updatedNewsletter) {
        util.setError(404, `Cannot find Newsletter with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Newsletter updated', updatedNewsletter)
        console.log(updatedNewsletter)
      }
      return util.send(res)
    } catch (err) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async deleteNewsletter(req, res) {
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }
    try {
      const NewsletterToDelete = await NewsletterService.deleteNewsletter(id)
      if (!NewsletterToDelete) {
        util.setError(404, `Newsletter with the id ${id} cannot be found`)
      } else {
        util.setSuccess(200, 'Newsletter deleted')
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async deleteAllNewsletters(req, res) { }
}

export default NewsletterController