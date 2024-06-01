import { Track } from '../models/Track'

export const jingleData: Omit<Track, 'createdAt' | 'updatedAt'> = {
  artistName: 'Радио Штаны',
  trackTitle: 'Прямой эфир',
  cover: '/assets/simple_logo.svg',
  preview: ''
}
