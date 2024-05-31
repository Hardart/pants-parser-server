import { Track } from '../models/Track'
import { ITrackMetadata } from '../types'

class TrackService {
  async findOne(artistName: string, trackTitle: string) {
    return await Track.findOne({ artistName, trackTitle })
  }

  async findLast() {
    return (await Track.find().select('-updatedAt -preview').sort({ createdAt: 'desc' }).limit(1))[0]
  }

  async save(trackData: ITrackMetadata) {
    return await Track.create(trackData)
  }

  async list() {
    return await Track.find().select('-updatedAt -preview').sort({ createdAt: 'desc' })
  }
}

export default new TrackService()
