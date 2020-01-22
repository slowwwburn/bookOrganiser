import { Router } from 'express'
import PageController from '../controllers/PageController'
const router = Router()

router.get('/', PageController.getAllPages)
router.post('/', PageController.addPage)
router.put('/:id', PageController.updatePage)
router.delete(':/id', PageController.deletePage)
router.delete(':/id', PageController.deleteAllPages)

export default router