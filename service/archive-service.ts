import { ArchiveTrack } from '../models/ArchiveTrack'
import ErrorService from './error-service'

export class ArchiveTrackService {
  static async save(id: string) {
    const track = new ArchiveTrack({
      createdAt: new Date(),
      trackId: id,
    })
    try {
      await track.save()
    } catch (error) {
      ErrorService.append(error)
    }
  }

  async findNewest() {
    const track = await ArchiveTrack.findOne().select('createdAt').sort({ createdAt: 'desc' })
    return track?.createdAt.toISOString() || ''
  }
}

export const archiveTrackService = new ArchiveTrackService()
