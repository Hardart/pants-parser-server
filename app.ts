import { Parser } from 'icecast-parser'
import ErrorService from './service/error-service'

const radioStation = new Parser({
  url: 'https://stream.elarin.ru/rsh_federal',
  emptyInterval: 10,
  errorInterval: 10,
  metadataInterval: 6,
  userAgent: 'HDRT_Parser'
})

radioStation.on('error', (err) => ErrorService.addError(err))
radioStation.on('empty', () => ErrorService.saveEmpty('Пустые данные'))

export { radioStation }
