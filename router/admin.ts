import { Router } from 'express'
import articleController from '../controllers/article-controller'
import categoryController from '../controllers/category-controller'
import userController from '../controllers/user-controller'
import pageController from '../controllers/page-controller'
import authMiddleware from '../middlewear/auth-middleware'
const router = Router()

router.get('/news', articleController.all)
router.get('/article', articleController.oneById)
router.get('/files', authMiddleware, pageController.files)

router.post('/article-add', authMiddleware, articleController.addOne)
router.post('/article-update', authMiddleware, articleController.updateOne)
router.post('/article-delete', authMiddleware, articleController.deleteOne)

router.post('/category-add', authMiddleware, categoryController.addOne)
router.post('/category-update', authMiddleware, categoryController.updateOne)
router.post('/category-delete', authMiddleware, categoryController.deleteOne)

router.post('/user-update', authMiddleware, userController.update)
router.post('/registration', authMiddleware, userController.registration)
router.post('/login', userController.login)
router.get('/check', userController.check)
router.get('/refresh', userController.refresh)

export default router
