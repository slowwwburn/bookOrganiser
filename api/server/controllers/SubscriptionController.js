import SubscriptionService from '../services/SubscriptionService'
import Util from '../utils/Utils'

const util = new Util()

class SubscriptionController {
  static async getAllSubscriptions(req, res) {
    const { limit, offset } = req.query
    try {
      const Subscriptions = await SubscriptionService.getAllSubscriptions(limit, offset)
      if (Subscriptions.length < 1) {
        util.setSuccess(200, 'No Subscription found', Subscriptions)
        return util.send(res)
      }
      if (limit && !offset) {
        util.setSuccess(200, `${Subscriptions.length} Subscriptions retrieved`, Subscriptions)
      }
      else if (!limit && offset) {
        util.setSuccess(200, `Retrieved all Subscriptions starting from position ${offset}`, Subscriptions)
      }
      else if (limit && offset) {
        util.setSuccess(200, `Retrieved ${Subscriptions.length} Subscriptions starting from position ${offset}`, Subscriptions)
      }
      else {
        util.setSuccess(200, `All Subscriptions retrieved`, Subscriptions)
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async getSubscriptionByEmail(req, res) {
    const email = req.query.email.replace(/_/g, ' ')
    try {
      const theSubscription = await SubscriptionService.getSubscriptionByEmail(email)
      if (!theSubscription) util.setError(404, `Cant find Subscription for ${email}`)
      else util.setSuccess(200, 'Subscription found', theSubscription)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async addSubscription(req, res) {
    let newSubscription = req.body
    console.log(newSubscription)
    if (!newSubscription.email || !newSubscription.name) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const exists = await SubscriptionService.getSubscriptionByEmail(newSubscription.email)
    if (exists) {
      util.setError(400, `Subscription with email: ${newSubscription.email}, already exists`)
      return util.send(res)
    }

    try {
      const createdSubscription = await SubscriptionService.addSubscription(newSubscription)
      util.setSuccess(201, 'Subscription Added!', createdSubscription)
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async updateSubscription(req, res) {
    const alteredSubscription = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    if (!alteredSubscription.email || !alteredSubscription.name) {
      util.setError(400, 'Please provide correct details')
      return util.send(res)
    }
    try {
      const updatedSubscription = await SubscriptionService.updateSubscription(id, alteredSubscription)
      if (!updatedSubscription) {
        util.setError(404, `Cannot find Subscription with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Subscription updated', updatedSubscription)
        console.log(updatedSubscription)
      }
      return util.send(res)
    } catch (err) {
      util.setError(404, err)
      return util.send(res)
    }
  }

  static async deleteSubscription(req, res) {
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }
    try {
      const SubscriptionToDelete = await SubscriptionService.deleteSubscription(id)
      if (!SubscriptionToDelete) {
        util.setError(404, `Subscription with the id ${id} cannot be found`)
      } else {
        util.setSuccess(200, 'Subscription deleted')
      }
      return util.send(res)
    } catch (err) {
      util.setError(400, err.message)
      return util.send(res)
    }
  }

  static async deleteAllSubscriptions(req, res) { }
}

export default SubscriptionController