import { Parser } from 'icecast-parser'
import ErrorService from './service/error-service'

export const radioStation = new Parser({
  url: 'https://stream.elarin.ru/rsh_federal',
  emptyInterval: 120,
  errorInterval: 120,
  metadataInterval: 6,
  userAgent: 'HDRT_Parser'
})

radioStation.on('error', (err) => ErrorService.addError(err))
radioStation.on('empty', () => ErrorService.saveEmpty('Пустые данные'))
