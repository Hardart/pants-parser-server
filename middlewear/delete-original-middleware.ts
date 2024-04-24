import fs from 'fs'
import { Response, NextFunction, Request } from 'express'
function deleteOriginalImage(req: Request, res: Response, next: NextFunction) {
  if (!req.file) return next()
  const file = req.file

  try {
    fs.unlinkSync(`${file.destination}/${file.filename}`)
  } catch (error) {
    console.log(error)
  }

  next()
}

export default deleteOriginalImage
