import { ArchiveTrack } from '../models/ArchiveTrack'
import { Track } from '../models/Track'
import { ITrackMetadata } from '../types'
import ErrorService from './error-service'

export class TrackService {
  static async findOne(artistName: string, trackTitle: string) {
    try {
      return await Track.findOne({ artistName, trackTitle })
    } catch (error) {
      ErrorService.append(error)
      return null
    }
  }

  static async save(trackData: ITrackMetadata) {
    const track = new Track(trackData)
    try {
      const { id } = await track.save()
      return id
    } catch (error) {
      ErrorService.append(error)
      return null
    }
  }

  async list(limit: number) {
    return await Track.find().limit(limit).sort('updatedAt')
  }

  async all() {
    return await Track.find().select('-updatedAt -preview').sort({ createdAt: 'desc' })
  }

  async count() {
    return await Track.find().countDocuments()
  }

  async history(date: string) {
    const fromTime = new Date(date)
    const toTime = new Date(Date.parse(date) + 3 * 3600 * 1000)
    const tracks = await ArchiveTrack.find({ createdAt: { $gte: fromTime, $lt: toTime } })
      .populate({
        path: 'trackId',
        select: '-createdAt -updatedAt',
      })
      .sort({ createdAt: 'desc' })
    return tracks
  }
}

export default new TrackService()
