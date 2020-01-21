import { Router } from 'express'
import CategoryController from '../controllers/CategoryController'
const router = Router()

router.get('/', CategoryController.getAllCategories)
router.get('/title', CategoryController.getCategoryByTitle)
router.post('/', CategoryController.addCategory)
router.put('/:id', CategoryController.updateCategory)
router.delete(':/id', CategoryController.deleteCategory)
router.delete(':/id', CategoryController.deleteAllCategories)

export default router