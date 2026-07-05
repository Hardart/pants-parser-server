import fs from 'fs'

export default class ErrorService {
  private static logsFolder = process.env.NODE_ENV === 'production' ? 'logs' : 'dev_logs'
  private static basePath = this.logsFolder
  static get dateAndTime() {
    return Intl.DateTimeFormat('ru', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date())
  }

  static createBasePath() {
    fs.mkdirSync(this.basePath, { recursive: true })
  }

  static get date() {
    return Intl.DateTimeFormat('ru', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    })
      .format(new Date())
      .replace('.', '')
  }

  static addError(error: unknown) {
    try {
      this.createBasePath()
      fs.appendFileSync(`${this.basePath}/errors.txt`, `${this.dateAndTime}: ${error}\n`, { encoding: 'utf-8' })
    } catch (error) {
      console.log(error)
    }
  }

  static saveStream(streamTitle?: string) {
    try {
      this.createBasePath()
      fs.appendFileSync(`${this.basePath}/${this.date}_stream.txt`, `${this.dateAndTime}: ${streamTitle}\n`, {
        encoding: 'utf-8'
      })
    } catch (error) {
      this.addError(error)
    }
  }

  static saveEmpty(streamTitle?: string) {
    try {
      this.createBasePath()
      fs.appendFileSync(`${this.basePath}/empty.txt`, `${this.dateAndTime}: Empty data ${streamTitle}\n`, { encoding: 'utf-8' })
    } catch (error) {
      this.addError(error)
    }
  }
}
