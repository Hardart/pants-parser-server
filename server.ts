import { Server } from 'socket.io'
import app from './app'
import { ITrackData, ITrackMetadata } from './types'
import { connectToDB } from './mongo-connect'
import { radioStation } from './parser'

const trackData: ITrackData = {
  isTrackInit: false,
  cache: undefined,
  title: undefined
}

const ioProps = {
  cors: { origin: 'http://localhost:3000' }
}
const io = new Server(3071, ioProps)
const fns = app(io, trackData)

io.on('connection', (socket) => {
  console.log(trackData)
  if (trackData.cache) socket.emit('meta', trackData.cache)
  socket.on('user:connect', () => socket.emit('meta', trackData.cache))

  socket.on('host:online', ({ hostId, state }) => {
    if (state) fns.findHost(hostId)
    else io.emit('host:data', undefined)
  })
})
connectToDB()
radioStation.on('metadata', fns.onMetadata.bind(fns))
