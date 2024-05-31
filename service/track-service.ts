import { Track } from '../models/Track'
import { ITrackMetadata } from '../types'

class TrackService {
  async findOne(artistName: string, trackTitle: string) {
    return await Track.findOne({ artistName, trackTitle })
  }

  async findLast() {
    return await Track.findOne().select('-updatedAt -preview').sort({ createdAt: 'desc' })
  }

  async save(trackData: ITrackMetadata) {
    return await Track.create(trackData)
  }

  async list() {
    return await Track.find().select('-updatedAt -preview').sort({ createdAt: 'desc' })
  }
}

export default new TrackService()
