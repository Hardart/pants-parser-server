import type { Response, Request, NextFunction } from 'express'
import userService from '../service/user-service'
import ErrorApi from '../handlers/error-api'

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      // const validErrors = validationResult(req)
      // if (!validErrors.isEmpty()) return next(ErrorApi.BadRequest('Ошибка при валидации', validErrors.array()))
      const userData = req.body
      const { accessToken } = await userService.registration(userData)
      // res.cookie('refreshToken', refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
      return res.status(200).json({ accessToken })
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // const validErrors = validationResult(req)
      // if (!validErrors.isEmpty()) return next(ErrorApi.BadRequest('Ошибка при валидации', validErrors.array()))
      const maxAge = 1000 * 60 * 60 * 24 * 30 // 30 дней
      const userData = req.body

      const { accessToken, refreshToken } = await userService.login(userData)
      res.cookie('refreshToken', refreshToken, { maxAge, httpOnly: true })
      return res.status(200).json({ accessToken, refreshToken })
    } catch (error) {
      next(error)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      return res.status(200).json(token)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken: oldToken } = req.cookies
      const { accessToken, refreshToken } = await userService.refresh(oldToken)
      const maxAge = 1000 * 60 * 60 * 24 * 30 // 30 дней
      res.cookie('refreshToken', refreshToken, { maxAge, httpOnly: true })
      return res.status(200).json({ accessToken, refreshToken })
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body
      const { accessToken, refreshToken } = await userService.updateOne(userData)
      const maxAge = 1000 * 60 * 60 * 24 * 30 // 30 дней
      res.cookie('refreshToken', refreshToken, { maxAge, httpOnly: true })
      return res.json({ accessToken })
    } catch (error) {
      next(error)
    }
  }

  async check(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body?.user) return next(ErrorApi.UnathorizedError())
      return res.status(200).json({ check: 'ok' })
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
