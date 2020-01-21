import { Router } from 'express'
import BlogController from '../controllers/BlogController'
const router = Router()

router.get('/', BlogController.getAllBlogs)
router.get('/title', BlogController.getBlogByTitle)
router.post('/', BlogController.addBlog)
router.put('/:id', BlogController.updateBlog)
router.delete('/:id', BlogController.deleteBlog)
// router.delete(':/id', BlogController.deleteAllBlogs)

export default router