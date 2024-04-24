import type { ItunesResponse, ItunesTrackMeta } from '../types'
import ErrorService from './error-service'

export class Itunes {
  private static term: string = ''

  static async searchOneTrack(searchTerm: string): Promise<ItunesTrackMeta | null> {
    this.term = searchTerm
    const data = await this.fetchTrack()
    if (!data) return null
    if (data.resultCount == 0) return null
    const { artworkUrl60, previewUrl } = data.results[0]
    return { cover: artworkUrl60, preview: previewUrl }
  }

  private static async fetchTrack() {
    console.log('search: ' + this.searchParams)
    try {
      const response = await fetch(`https://itunes.apple.com/search?${this.searchParams}`)
      return (await response.json()) as ItunesResponse
    } catch (error) {
      ErrorService.append(error)
      return null
    }
  }

  private static get searchParams() {
    return new URLSearchParams({ term: this.term, limit: '1', entity: 'song', media: 'music' })
  }
}
