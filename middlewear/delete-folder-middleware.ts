import fs from 'fs'
import { Response, NextFunction, Request } from 'express'
import ErrorApi, { isError } from '../handlers/error-api'

function deleteFolder(req: Request, res: Response, next: NextFunction) {
  const { path } = req.body
  if (!path) {
    req.body.status = false
    return next()
  }
  const isFolder = !path.match(/\.(jpe?g|png|webp|avif)$/)

  try {
    const dir = `./assets${path}`
    if (isFolder) {
      fs.rmdirSync(dir)
      req.body.status = true
    } else {
      req.body.status = false
    }
  } catch (error) {
    if (isError(error)) throw ErrorApi.custom(error.errno)
  }

  next()
}

export default deleteFolder
