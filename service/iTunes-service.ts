import type { ITunesResponse, ITunesTrackMeta } from '../types'

export class ITunes {
  private static term: string = ''

  static async searchSingleTrack(searchTerm: string): Promise<ITunesTrackMeta | null> {
    this.term = searchTerm
    const data = await this._fetchTrack()
    if (!data) return null
    if (data.resultCount == 0) return null
    const { artworkUrl60, previewUrl } = data.results[0]
    return { cover: artworkUrl60, preview: previewUrl }
  }

  private static async _fetchTrack(): Promise<ITunesResponse> {
    // console.log('search: ' + this.searchParams)
    const response = await fetch(`https://itunes.apple.com/search?${this._searchParams}`)
    const meta = await response.json()
    return meta as ITunesResponse
  }

  private static get _searchParams() {
    return new URLSearchParams({ term: this.term, limit: '1', entity: 'song', media: 'music' })
  }
}
