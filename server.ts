import { Server } from 'socket.io'
import { connectToDB } from './mongo-connect'
import { radioStation } from './parser'
import { IcecastParser } from './utils/IcecastParser'
import { CacheService } from './service/cache-service'

const ioProps = {
  cors: { origin: '*' }
}
const io = new Server(3071, ioProps)

io.on('connection', (socket) => {
  if (CacheService.metaData.artistName !== '') socket.emit('meta', CacheService.metaData)
  socket.on('user:connect', () => socket.emit('meta', CacheService.metaData))

  // socket.on('host:online', ({ hostId, state }) => {
  //   if (state) fns.findHost(hostId)
  //   else io.emit('host:data', undefined)
  // })
})
connectToDB()
radioStation.on('metadata', (metadata) => IcecastParser.readMetadata(io, metadata))
