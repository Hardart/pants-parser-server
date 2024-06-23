import { Server, Socket } from 'socket.io'
import { connectToDB } from './mongo-connect'
import { radioStation } from './parser'
import { IcecastParser } from './utils/IcecastParser'
import { CacheService } from './service/cache-service'

const ioProps = {
  cors: { origin: '*' }
}
const io = new Server(3071, ioProps)

connectToDB()
radioStation.on('metadata', (metadata) => IcecastParser.readMetadata(io, metadata))
io.on('connection', onConnection)

function onConnection(socket: Socket) {
  if (CacheService.metaData.artistName !== '') socket.emit('meta', CacheService.metaData)
  socket.on('user:connect', () => socket.emit('meta', CacheService.metaData))
}
