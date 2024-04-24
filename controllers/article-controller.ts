import articleService from '../service/article-service'
import type { Response, Request, NextFunction } from 'express'
import type { QueryParams } from '../types/custom-request'

class ArticleController {
  async all(_: Request, res: Response, next: NextFunction) {
    try {
      const news = await articleService.all()
      return res.json(news)
    } catch (error) {
      next(error)
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.body.queryParams as QueryParams
      const articles = await articleService.list(queryParams)
      const count = await articleService.count(queryParams)
      res.setHeader('X-Total', count)
      return res.json(articles)
    } catch (error) {
      next(error)
    }
  }

  async one(req: Request, res: Response, next: NextFunction) {
    const { slug } = req.query as Record<string, string>
    try {
      const articles = await articleService.findBySlug(slug)
      return res.json(articles)
    } catch (error) {
      next(error)
    }
  }

  async oneByTag(_: Request, res: Response, next: NextFunction) {
    try {
      const articles = await articleService.findByTag('музыка')
      return res.json(articles)
    } catch (error) {
      next(error)
    }
  }

  async oneById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query as Record<string, string>
      const article = await articleService.findById(id)
      return res.json(article)
    } catch (error) {
      next(error)
    }
  }

  async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      const articleData = req.body
      const article = await articleService.add(articleData)
      return res.json(article)
    } catch (error) {
      next(error)
    }
  }

  async updateOne(req: Request, res: Response, next: any) {
    try {
      const articleData = req.body
      const article = await articleService.updateOne(articleData)
      return res.json(article)
    } catch (error) {
      next(error)
    }
  }

  async deleteOne(req: Request, res: Response, next: any) {
    try {
      const { id } = req.body
      const cat = await articleService.deleteOne(id)
      return res.json(cat)
    } catch (error) {
      next(error)
    }
  }
}

export default new ArticleController()
