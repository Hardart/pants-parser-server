import fs from 'fs'
import ErrorService from './error-service'

class FileService {
  readImages(src?: string) {
    try {
      return foldersMap(`./assets${src || '/images'}/`)
    } catch (error) {
      console.log(error)
      ErrorService.append(error)
      return
    }
  }
}

export default new FileService()

function foldersMap(path: string): string[] {
  const files = fs.readdirSync(path)
  return files
    .flatMap(f => {
      const fullPath = `${path}${f}`
      return fullPath.replace('./assets', '')
    })
    .filter(path => {
      if (path.match(/\.(jpe?g|png|webp|avif)$/)) {
        return path.includes('_preview') ? path : undefined
      } else return !path.includes('.DS')
    })
}
