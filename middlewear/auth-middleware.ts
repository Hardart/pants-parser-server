import { Response, NextFunction, Request } from 'express'
import ErrorApi from '../handlers/error-api'
import tokenService from '../service/token-service'

export default function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) return next(ErrorApi.UnathorizedError())

  const accessToken = authHeader.split(' ')[1]
  if (!accessToken) return next(ErrorApi.UnathorizedError())

  const userData = tokenService.validateAccessToken(accessToken)
  if (!userData) return next(ErrorApi.UnathorizedError())

  const { id, email, name, roles } = userData
  req.body.user = { id, email, name, roles }
  next()
}
