import { Router } from 'express'
import filesController from '../controllers/files-controller'
import imageUploadMiddlewear from '../middlewear/upload/image-upload-middlewear'
import { resizeImage } from '../middlewear/upload/image-resize-middlewear'
import deleteAllImagesById from '../middlewear/delete-all-middleware'
import deleteOriginalImage from '../middlewear/delete-original-middleware'
import deleteFolder from '../middlewear/delete-folder-middleware'

const router = Router()
router.post('/image/avatar', imageUploadMiddlewear.single('avatar'), resizeImage, deleteOriginalImage, filesController.uploadTest)
router.post('/image/gallery', imageUploadMiddlewear.single('gallery'), resizeImage, deleteOriginalImage, filesController.uploadTest)
router.post('/image/news', imageUploadMiddlewear.single('news'), resizeImage, deleteOriginalImage, filesController.uploadTest)
router.post('/image-delete', deleteAllImagesById, filesController.deleteTest)
router.post('/folder-delete', deleteFolder, filesController.deleteTest)
export default router
