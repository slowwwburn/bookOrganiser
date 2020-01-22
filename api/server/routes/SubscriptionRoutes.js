import { Router } from 'express'
import SubscriptionController from '../controllers/SubscriptionController'
const router = Router()

router.get('/', SubscriptionController.getAllSubscriptions)
router.post('/', SubscriptionController.addSubscription)
router.put('/:id', SubscriptionController.updateSubscription)
router.delete(':/id', SubscriptionController.deleteSubscription)
router.delete(':/id', SubscriptionController.deleteAllSubscriptions)

export default router