import { Router } from 'express'
import articleController from '../controllers/article-controller'
import categoryController from '../controllers/category-controller'
import pageController from '../controllers/page-controller'
import trackController from '../controllers/track-controller'
import { decodeQuery } from '../middlewear/query-middlwear'
import tagController from '../controllers/tag-controller'

const router = Router()

router.get('/meta', pageController.meta)
router.get('/main', decodeQuery, pageController.main)
router.get('/app', pageController.meta)
router.get('/team', pageController.hosts)
router.get('/schedule', pageController.schedule)

router.get('/categories', categoryController.getAll)
router.get('/article', articleController.one)
router.get('/tags', tagController.list)
router.post('/tag', articleController.oneByTag)
router.get('/news', decodeQuery, articleController.list)
router.get('/track', trackController.list)
router.get('/tracks', trackController.all)
router.post('/history', trackController.getByDate)

export default router
