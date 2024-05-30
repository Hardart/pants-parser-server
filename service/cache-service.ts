export class CacheService {
  private static trackMeta = {
    artistName: '',
    trackTitle: '',
    cover: ''
  }

  static get metaData() {
    return this.trackMeta
  }

  static saveTrack(artistName: string, trackTitle: string) {
    this.trackMeta.artistName = artistName
    this.trackMeta.trackTitle = trackTitle
  }

  static saveCovers(cover: string) {
    this.trackMeta.cover = cover
  }
}
