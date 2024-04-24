import multer from 'multer'
import fs from 'fs'
import crypto from 'crypto'

const getExtension = (fileSrc: string) => fileSrc.replace(/.+\./, '')
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const folderName = file.fieldname
    const folderId = new Date().toLocaleDateString().replace(/\./g, '')
    const imageId = crypto.randomBytes(8).toString('hex')
    const ext = getExtension(file.originalname)
    const fileName = `${imageId}.${ext}`
    const dest = `./assets/images/${folderName}/${folderId}`
    fs.mkdirSync(dest, { recursive: true })
    file.filename = fileName

    cb(null, dest)
  },

  filename(req, file, cb) {
    cb(null, file.filename)
  },
})

export default multer({ storage })
