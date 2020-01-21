import db from '../src/models'
import { Op } from 'sequelize'

class SubscriptionService {
  static async getAllSubscriptions(limit, offset) {
    try {
      if (limit && !offset) {
        return await db.Subscription.findAll({ limit })
      }
      else if (!limit && offset) {
        return await db.Subscription.findAll({ offset })
      }
      else if (limit && offset) {
        return await db.Subscription.findAll({ limit, offset })
      }
      else {
        return await db.Subscription.findAll()
      }
    } catch (err) { throw err }
  }

  static async getSubscriptionById(id) {
    try {
      return await db.Subscription.findOne({ where: { id: Number(id) } })
    } catch (err) {
      throw err
    }
  }

  static async getSubscriptionByEmail(email) {
    try {
      return await db.Subscription.findOne({ where: { email: { [Op.iLike]: `%${email}` } } })
    } catch (err) { throw err }
  }

  static async addSubscription(newSubscription) {
    try {
      return await db.Subscription.create(newSubscription)
    } catch (err) {
      throw err
    }
  }

  static async updateSubscription(id, updateSubscription) {
    try {
      const subscriptionToUpdate = await db.Subscription.findOne({ where: { id: Number(id) } })

      if (subscriptionToUpdate) {
        await db.Subscription.update(updateSubscription, {
          where: { id: Number(id) }
        })
        return updateSubscription
      } return null
    } catch (err) {
      throw err
    }
  }

  static async deleteSubscription(id) {
    try {
      const subscriptionToDelete = await db.Subscription.findOne({ where: { id: Number(id) } })

      if (subscriptionToDelete) return await db.Subscription.destroy({ where: { id: Number(id) } })
      return null
    } catch (err) {
      throw err
    }
  }

  static async deleteAllSubscriptions() {
    try {
      return await db.Subscription.destroy({ where: {} })
    } catch (err) {
      throw err
    }
  }
}

export default SubscriptionService