import { Server } from 'socket.io'
import { ITrackData, ITrackMetadata } from './types'
import userService from './service/user-service'
import trackService from './service/track-service'
import trackArchiveService from './service/track-archive-service'
import { jingleData } from './utils/jingle'
import { ITunes } from './service/iTunes-service'
import { Track } from './models/Track'
import ErrorService from './service/error-service'

export default (io: Server, trackData: ITrackData) => ({
  onMetadata(metadata: Map<string, string>) {
    const streamTitle = metadata.get('StreamTitle')
    ErrorService.saveStream(streamTitle)
    if (trackData.title !== streamTitle) {
      trackData.title = streamTitle
      if (trackData.isTrackInit) {
        this.saveTrack()
      } else {
        this.findLastTrack()
        trackData.isTrackInit = true
      }
    }
  },

  async findHost(id: string) {
    const host = await userService.findById(id)
    if (host) io.emit('host:data', host)
  },

  async saveTrack() {
    if (!trackData.title) return io.emit('meta', jingleData)
    const [artistName, trackTitle] = trackData.title.split(' - ')
    const track = await trackService.findOne(artistName, trackTitle)
    if (track) {
      trackArchiveService.save(track.id)
      trackData.cache = track
      io.emit('meta', trackData.cache)
    } else {
      this.addTrackToDB(trackData.title, artistName, trackTitle)
    }
  },

  async findLastTrack() {
    const tracks = await trackArchiveService.findLast()
    if (tracks.length) {
      const track = tracks[0].trackId as unknown as Track
      trackData.cache = track
      io.emit('meta', trackData.cache)
    }
  },

  async addTrackToDB(searchTerm: string, artistName: string, trackTitle: string) {
    const iTunesResponse = await ITunes.searchOneTrack(searchTerm)
    if (!iTunesResponse) return ErrorService.saveStream(`Can't find: ${searchTerm}`)
    const trackMetaData: ITrackMetadata = { ...iTunesResponse, artistName, trackTitle }
    const createdTrack = await trackService.save(trackMetaData)
    trackData.cache = createdTrack
    trackArchiveService.save(createdTrack.id)
    io.emit('meta', trackData.cache)
  }
})
