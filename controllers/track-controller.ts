import type { Response, Request } from 'express'
import trackService from '../service/track-service'

class TrackController {
  async list(req: Request, res: Response) {
    const { limit } = req.query
    const tracks = await trackService.list(Number(limit))
    return res.json(tracks)
  }

  async all(req: Request, res: Response) {
    const tracks = await trackService.all()
    const count = await trackService.count()
    res.setHeader('X-Total', count)
    return res.json(tracks)
  }

  async getByDate(req: Request, res: Response) {
    const { date } = req.body
    const tracks = await trackService.history(String(date))
    return res.json(tracks)
  }
}

export default new TrackController()
