import { Parser } from 'icecast-parser'
import { Server } from 'socket.io'
import { MetadataService } from './metadata-service'
import { CacheService } from './cache-service'
import { TrackService } from './track-service'
import { ArchiveTrackService } from './archive-service'
import { Itunes } from './iTunes-service'
import { ItunesTrackMeta } from '../types'
import ErrorService from './error-service'

const simpleMeta = {
  artistName: 'Радио Штаны',
  trackTitle: '',
  cover: '/images/simple_logo.svg',
}

export class IcecastService {
  io: Server | undefined = undefined
  private url = 'https://stream.lolamedia.ru/rsh_federal'
  private emptyInterval = 4
  private errorInterval = 5
  private metadataInterval = 5
  private trackTitle: string = ''

  initRadioStream() {
    const radioStation = new Parser({
      url: this.url,
      emptyInterval: this.emptyInterval,
      errorInterval: this.errorInterval,
      metadataInterval: this.metadataInterval,
      userAgent: 'HDRT_Parser',
    })
    radioStation.on('metadata', this.onMetadata.bind(this))
    radioStation.on('error', console.log)
    radioStation.on('empty', this.onEmpty)
  }

  initSocket(io: Server) {
    this.io = io
  }

  private async onMetadata(metadata: Map<string, string>) {
    const streamTitle = metadata.get('StreamTitle')
    if (this.trackTitle === streamTitle) return
    ErrorService.saveStream(streamTitle)
    if (!streamTitle) return this.io ? this.io.emit('radio:jingle', simpleMeta) : undefined
    this.trackTitle = streamTitle
    const { searchTerm, artistName, trackTitle } = MetadataService.parseTrackName(streamTitle)
    CacheService.saveTrack(artistName, trackTitle)

    await this.saveMetadata(searchTerm)
    if (this.io) this.io.emit('radio:track', CacheService.metaData)
    return
  }

  private onEmpty() {
    console.log('empty meta')
  }

  private async saveMetadata(searchTerm: string) {
    const { artistName, trackTitle } = CacheService.metaData
    const track = await TrackService.findOne(artistName, trackTitle)
    if (track) {
      await ArchiveTrackService.save(track.id)
      CacheService.saveCovers(track.cover || '')
    } else {
      const trackMeta = await Itunes.searchOneTrack(searchTerm)
      await this.saveTrackData(artistName, trackTitle, trackMeta)
    }
  }

  private async saveTrackData(artistName: string, trackTitle: string, trackMeta: ItunesTrackMeta | null) {
    CacheService.saveCovers(trackMeta?.cover || simpleMeta.cover)
    const id = await TrackService.save({
      artistName,
      trackTitle,
      cover: trackMeta?.cover || simpleMeta.cover,
      preview: trackMeta?.preview || '',
    })
    if (id) ArchiveTrackService.save(id)
  }
}
