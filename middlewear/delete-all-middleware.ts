import fs from 'fs'
import { Response, NextFunction, Request } from 'express'
function deleteAllImagesById(req: Request, res: Response, next: NextFunction) {
  const { path } = req.body
  if (!path) {
    req.body.status = false
    return next()
  }
  const fileID = (path as string).replace(/.+\//g, '').replace(/_.+/, '')
  const clearPath = path.match(/.+(?=\/)/g)[0]
  const dir = `./assets${clearPath}`
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    if (!file.includes(fileID)) return
    try {
      fs.unlinkSync(`${dir}/${file}`)
      req.body.status = true
    } catch (error) {
      console.log(error)
      req.body.status = false
    }
  })

  next()
}

export default deleteAllImagesById
