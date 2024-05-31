import { Server } from 'socket.io'
import { ITrackData, ITrackMetadata } from './types'
import userService from './service/user-service'
import trackService from './service/track-service'
import trackArchiveService from './service/track-archive-service'
import { jingleData } from './utils/jingle'
import { ITunes } from './service/iTunes-service'

export default (io: Server, trackData: ITrackData) => ({
  onMetadata(metadata: Map<string, string>) {
    const streamTitle = metadata.get('StreamTitle')
    if (trackData.title !== streamTitle) {
      trackData.title = streamTitle
      if (trackData.isTrackInit) this.saveTrack()
      else trackData.isTrackInit = true
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

  async addTrackToDB(searchTerm: string, artistName: string, trackTitle: string) {
    const iTunesResponse = await ITunes.searchOneTrack(searchTerm)
    if (!iTunesResponse) return
    const trackMetaData: ITrackMetadata = { ...iTunesResponse, artistName, trackTitle }
    const createdTrack = await trackService.save(trackMetaData)
    trackData.cache = createdTrack
    trackArchiveService.save(createdTrack.id)
    io.emit('meta', trackData.cache)
  }
})
