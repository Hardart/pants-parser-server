import { Server } from 'socket.io'
import { Track } from '../models/Track'
import { MetadataService } from '../service/metadata-service'
import trackArchiveService from '../service/track-archive-service'
import trackService from '../service/track-service'
import { ITunes } from '../service/iTunes-service'
import { ITrackMetadata } from '../types'
import { CacheService } from '../service/cache-service'

class BaseParser {
  static isTrackInit: boolean = false
  static trackData: string
  static cachedTrack: (Track & { id?: string }) | null = null
  static track: (Track & { id?: string }) | null = null
}

class TrackParser extends BaseParser {
  private static async _tryFindTrack() {
    const { artistName, trackTitle } = MetadataService.parseTrackTitle(this.trackData)

    this.track = await trackService.findOne(artistName, trackTitle)
    CacheService.addData(this.track)
  }

  private static async _saveToDataBase() {
    const { artistName, trackTitle, searchTerm } = MetadataService.parseTrackTitle(this.trackData)
    const iTunesResponse = await ITunes.searchSingleTrack(searchTerm)

    const trackDataToSave: ITrackMetadata = iTunesResponse
      ? { ...iTunesResponse, artistName, trackTitle }
      : { ...CacheService.emptyData, artistName, trackTitle }

    const createdTrack = await trackService.save(trackDataToSave)
    this.track = createdTrack
    CacheService.addData(this.track)
  }

  private static _addTrackToArchive() {
    if (this.track && this.track.id) {
      trackArchiveService.save(this.track.id)
    }
  }

  static async saveTrack() {
    await this._tryFindTrack()
    if (this.track === null) await this._saveToDataBase()
    this._addTrackToArchive()
  }

  static async tryToFindLastTrack() {
    const tracks = await trackArchiveService.findLast()
    if (tracks.length) {
      this.track = tracks[0].trackId as unknown as Track
      CacheService.addData(this.track)
    }
  }
}

export class IcecastParser {
  static async readMetadata(io: Server, metadata: Map<string, string>) {
    const streamTitle = metadata.get('StreamTitle')
    if (typeof streamTitle === 'undefined' || streamTitle === '') return io.emit('meta', CacheService.addBaseData())
    if (TrackParser.trackData !== streamTitle) {
      TrackParser.trackData = streamTitle
      if (TrackParser.isTrackInit) {
        await TrackParser.saveTrack()
      } else {
        await TrackParser.tryToFindLastTrack()
        TrackParser.isTrackInit = true
      }
      io.emit('meta', CacheService.metaData)
    }
  }
}
