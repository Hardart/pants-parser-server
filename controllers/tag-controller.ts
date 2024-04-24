import type { Response, Request, NextFunction } from 'express'
import tagService from '../service/tag-service'

class TagController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const news = await tagService.list()
      return res.json(news)
    } catch (error) {
      next(error)
      return
    }
  }
}

export default new TagController()
