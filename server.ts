import { Server } from 'socket.io'
import { radioStation } from './app'
import type { Track } from './models/Track'
import trackService from './service/track-service'
import trackArchiveService from './service/track-archive-service'
import { ITunes } from './service/iTunes-service'
import { ITrackMetadata } from './types'
import { connectToDB } from './mongo-connect'
import userService from './service/user-service'
let trackInit: string | undefined = undefined
let trackData: string | undefined = ''
let trackCacheData: Track | null

const io = new Server(3071, {
  cors: { origin: 'http://localhost:3000' }
})

io.on('connection', (socket) => {
  console.log('Connected: ' + socket.id)

  socket.on('user:connect', () => {
    socket.emit('meta', trackCacheData)
  })
  socket.emit('meta', trackCacheData)
  // console.log('SEND:' + trackCacheData?.artistName)
  socket.on('host:online', ({ hostId, state }) => {
    if (state) findHost(hostId)
    else io.emit('host:data', undefined)
  })
})

radioStation.on('metadata', onMetadata)

function onMetadata(metadata: Map<string, string>) {
  const streamTitle = metadata.get('StreamTitle')
  if (trackData !== streamTitle) {
    trackData = streamTitle
    // console.log('Get track meta')
    if (trackInit) saveTrack()
    else trackInit = trackData
  }
}

async function findHost(id: string) {
  const host = await userService.findById(id)
  if (host) {
    // console.log('HOST: FINDED')
    io.emit('host:data', host)
  }

  // try {
  //   const body = JSON.stringify({ id })
  //   const res = await fetch(FIND_HOST_URL, { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
  //   const { data } = (await res.json()) as any | null
  //   console.log('HOST: FINDED')
  //   io.emit('host:data', data.host)
  // } catch (error) {
  //   console.log(error)
  // }
}

async function saveTrack() {
  if (!trackData) return console.log('Jingle data')
  const [artistName, trackTitle] = trackData.split(' - ')
  const track = await trackService.findOne(artistName, trackTitle)
  if (track) {
    trackArchiveService.save(track.id)
    // console.log('FIND: ' + trackData)
    trackCacheData = track
    io.emit('meta', trackCacheData)
  } else {
    addTrackToDB(trackData, artistName, trackTitle)
    // console.log('SAVE: ' + trackData)
  }
}

async function addTrackToDB(trackData: string, artistName: string, trackTitle: string) {
  const iTunesResponse = await ITunes.searchOneTrack(trackData)
  if (!iTunesResponse) return
  const trackMetaData: ITrackMetadata = { ...iTunesResponse, artistName, trackTitle }
  const createdTrack = await trackService.save(trackMetaData)
  trackCacheData = createdTrack
  trackArchiveService.save(createdTrack.id)
  io.emit('meta', trackCacheData)
}

connectToDB()
