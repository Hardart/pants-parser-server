import type { Response, Request, NextFunction } from 'express'

class FileController {
  async uploadTest(req: Request, res: Response, next: NextFunction) {
    if (!req.file) return res.send({ error: 'upload image error' })
    const path = req.file.path.replace('assets', '')
    return res.json(path)
  }

  async deleteTest(req: Request, res: Response, next: NextFunction) {
    return res.json(req.body)
  }
}

export default new FileController()
