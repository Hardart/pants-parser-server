import { Server } from 'socket.io'
import { ITrackData, ITrackMetadata } from './types'
import userService from './service/user-service'
import trackService from './service/track-service'
import trackArchiveService from './service/track-archive-service'
import { jingleData } from './utils/jingle'
import { ITunes } from './service/iTunes-service'

export default (io: Server, { cache, title, isTrackInit }: ITrackData) => ({
  onMetadata(metadata: Map<string, string>) {
    const streamTitle = metadata.get('StreamTitle')
    if (title !== streamTitle) {
      title = streamTitle
      if (isTrackInit) this.saveTrack()
      else isTrackInit = true
    }
  },

  async findHost(id: string) {
    const host = await userService.findById(id)
    if (host) io.emit('host:data', host)
  },

  async saveTrack() {
    if (!title) return io.emit('meta', jingleData)
    const [artistName, trackTitle] = title.split(' - ')
    const track = await trackService.findOne(artistName, trackTitle)
    if (track) {
      trackArchiveService.save(track.id)
      cache = track
      io.emit('meta', cache)
    } else {
      this.addTrackToDB(title, artistName, trackTitle)
    }
  },

  async addTrackToDB(trackData: string, artistName: string, trackTitle: string) {
    const iTunesResponse = await ITunes.searchOneTrack(trackData)
    if (!iTunesResponse) return
    const trackMetaData: ITrackMetadata = { ...iTunesResponse, artistName, trackTitle }
    const createdTrack = await trackService.save(trackMetaData)
    cache = createdTrack
    trackArchiveService.save(createdTrack.id)
    io.emit('meta', cache)
  }
})
