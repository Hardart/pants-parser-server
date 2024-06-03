import fs from 'fs'

export default class ErrorService {
  private static basePath = process.env.NODE_ENV === 'production' ? '../logs' : './logs'
  static get dateAndTime() {
    return Intl.DateTimeFormat('ru', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date())
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
      fs.appendFileSync(`${this.basePath}/errors.txt`, `${this.dateAndTime}: ${error}\n`, { encoding: 'utf-8' })
    } catch (error) {
      console.log(error)
    }
  }

  static saveStream(streamTitle?: string) {
    try {
      fs.appendFileSync(`${this.basePath}/${this.date}_stream.txt`, `${this.dateAndTime}: ${streamTitle}\n`, {
        encoding: 'utf-8'
      })
    } catch (error) {
      this.addError(error)
    }
  }

  static saveEmpty(streamTitle?: string) {
    try {
      fs.appendFileSync(`${this.basePath}/empty.txt`, `${this.dateAndTime}: Empty data ${streamTitle}\n`, { encoding: 'utf-8' })
    } catch (error) {
      this.addError(error)
    }
  }
}
