import categoryService from '../service/category-service'
import type { Response, Request } from 'express'

class CategoryController {
  async getAll(req: Request, res: Response, next: any) {
    try {
      const categories = await categoryService.getAll()
      return res.json(categories)
    } catch (error) {
      next(error)
      return
    }
  }

  async addOne(req: Request, res: Response, next: any) {
    try {
      const catData = req.body
      const cat = await categoryService.add(catData)
      return res.json(cat)
    } catch (error) {
      next(error)
      return
    }
  }

  async updateOne(req: Request, res: Response, next: any) {
    try {
      const catData = req.body
      const cat = await categoryService.updateOne(catData)
      return res.json(cat)
    } catch (error) {
      next(error)
      return
    }
  }

  async deleteOne(req: Request, res: Response, next: any) {
    try {
      const { id } = req.body
      const cat = await categoryService.deleteOne(id)
      return res.json(cat)
    } catch (error) {
      next(error)
      return
    }
  }
}

export default new CategoryController()
