import { Track } from '../models/Track'

export class CacheService {
  static get emptyData() {
    return {
      artistName: '',
      trackTitle: '',
      cover: '',
      preview: ''
    }
  }
  private static _trackMeta: Omit<Track, 'createdAt' | 'updatedAt'> = { ...this.emptyData }

  static get metaData() {
    return this._trackMeta
  }

  static addData(track: Track | null) {
    if (!track) this.addBaseData()
    else this._trackMeta = track
  }

  static addBaseData() {
    this._trackMeta.artistName = 'Радио Штаны'
    this._trackMeta.trackTitle = 'Прямой эфир'
    this._trackMeta.cover = '/assets/simple_logo.svg'
    return this._trackMeta
  }
}
