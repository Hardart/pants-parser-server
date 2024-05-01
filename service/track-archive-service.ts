import { TrackArchive } from '../models/TracksArchive'

export class TrackArchiveService {
  async save(id: string) {
    return await TrackArchive.create({
      createdAt: new Date(),
      trackId: id
    })
  }

  async findNewest() {
    const track = await TrackArchive.findOne().select('createdAt').sort({ createdAt: 'desc' })
    return track ? track.createdAt.toISOString() : new Date().toISOString()
  }
}

export default new TrackArchiveService()
