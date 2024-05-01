export interface ITunesResponse {
  resultCount: number
  results: ITunesTrack[]
}

export interface ITunesTrack {
  artistName: string
  artworkUrl30: string
  artworkUrl60: string
  artworkUrl100: string
  previewUrl: string
  trackId: number
}

export interface ITunesTrackMeta {
  cover: string
  preview: string
}

export interface ITrackMetadata {
  artistName: string
  trackTitle: string
  cover: string
  preview: string
}

export interface ICoverData {
  art30: string
  art60: string
  art100: string
  art300: string
  art600: string
}
