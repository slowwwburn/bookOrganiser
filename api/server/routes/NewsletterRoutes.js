import { Router } from 'express'
import NewsletterController from '../controllers/NewsletterController'
const router = Router()

router.get('/', NewsletterController.getAllNewsletters)
router.post('/', NewsletterController.addNewsletter)
router.put('/:id', NewsletterController.updateNewsletter)
router.delete(':/id', NewsletterController.deleteNewsletter)
router.delete(':/id', NewsletterController.deleteAllNewsletters)

export default router