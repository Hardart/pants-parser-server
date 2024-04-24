import { Server } from 'socket.io'
import { IcecastService } from './icecast-service'
import { CacheService } from './cache-service'

const icecast = new IcecastService()
icecast.initRadioStream()

export function onConnection(io: Server) {
  return function () {
    io.emit('radio:track', CacheService.metaData)
    icecast.initSocket(io)
  }
}
