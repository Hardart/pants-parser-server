import { Server } from 'socket.io'
import { radioStation } from './app'
import type { Track } from './models/Track'
const BASE_URL = 'http://localhost:3068/api/v1/dashboard'
const SAVE_TRACK_URL = BASE_URL + '/track-save'
const FIND_HOST_URL = BASE_URL + '/user'
let trackData: string | undefined = ''
let trackCacheData: Track | null
const io = new Server(3071, {
  cors: { allowedHeaders: '*' }
})

io.on('connection', (socket) => {
  socket.on('user:connect', () => {
    socket.emit('meta', trackCacheData)
  })
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
    console.log(trackData)
    saveTrack()
  }
}

async function findHost(id: string) {
  try {
    const body = JSON.stringify({ id })
    const res = await fetch(FIND_HOST_URL, { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
    const { data } = (await res.json()) as any | null
    console.log('HOST: FINDED')
    io.emit('host:data', data.host)
  } catch (error) {
    console.log(error)
  }
}

async function saveTrack() {
  if (!trackData) return
  const body = JSON.stringify({ trackData })
  try {
    const res = await fetch(SAVE_TRACK_URL, { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
    const data = (await res.json()) as Track | null
    console.log('DATA: recieved')
    trackCacheData = data
    io.emit('meta', data)
  } catch (error) {
    console.log(error)
  }
}
