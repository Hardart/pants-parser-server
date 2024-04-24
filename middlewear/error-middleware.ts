import { Response, Request, ErrorRequestHandler, NextFunction } from 'express'
import ErrorApi from '../handlers/error-api'

export const ErrorHandler: ErrorRequestHandler = (err: Error | ErrorApi, req: Request, res: Response, next: NextFunction) => {
  if ('custom' in err) {
    res.status(err.statusCode).json({ message: err.message })
    return
  }

  return res.status(500).json('Сервер не отвечает')
}
