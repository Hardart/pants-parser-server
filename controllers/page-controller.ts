import type { Response, Request, NextFunction } from 'express'
import type { QueryParams } from '../types/custom-request'
import pageService from '../service/page-service'
import tagService from '../service/tag-service'
import { archiveTrackService } from '../service/archive-service'
import fileService from '../service/file-service'

class PageController {
  async schedule(_: Request, res: Response, next: NextFunction) {
    try {
      const data = await pageService.programs()
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }

  async meta(_: Request, res: Response, next: NextFunction) {
    const archiveCalendar = { start: '', end: new Date().toISOString() }
    try {
      const navList = await pageService.nav()
      const tags = await tagService.list()
      archiveCalendar.start = await archiveTrackService.findNewest()
      return res.json({ navList, tags, tracks: { archive: { calendar: archiveCalendar } } })
    } catch (error) {
      next(error)
      return
    }
  }

  async hosts(_: Request, res: Response, next: NextFunction) {
    try {
      const data = await pageService.hosts()
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }

  async main(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.body.queryParams as QueryParams
      const data = await pageService.index(query)
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }

  async news(_: Request, res: Response, next: NextFunction) {
    try {
      const tags = await tagService.list()
      return res.json({ tags })
    } catch (error) {
      next(error)
      return
    }
  }

  async files(req: Request, res: Response, next: NextFunction) {
    try {
      const { src } = req.query as Record<string, string>
      const data = fileService.readImages(src)
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }
}

export default new PageController()
