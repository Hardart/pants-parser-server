import { Track } from '../models/Track'

export class CacheService {
  static get emptyData() {
    return {
      artistName: 'Радио Штаны',
      trackTitle: 'Прямой эфир',
      cover: '/assets/simple_logo.svg',
      preview: ''
    }
  }
  private static _trackMeta: Omit<Track, 'createdAt' | 'updatedAt'> = this.emptyData

  static get metaData() {
    return this._trackMeta
  }

  static addData(track: Track | null) {
    if (!track) this._trackMeta = this.emptyData
    else this._trackMeta = track
  }
}
