export default class ErrorApi extends Error {
  statusCode
  isOperational
  errors
  custom
  constructor(statusCode: number, message: string, errors: any[] = []) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    this.custom = true
    this.errors = errors
    Error.captureStackTrace(this, this.constructor)
  }

  static BadRequest(message: string, errors?: any[]) {
    return new ErrorApi(400, message, errors)
  }

  static NoEnvVariable(varaible: string) {
    return new ErrorApi(400, `Переменной ${varaible} нет в файле .env`)
  }

  static UnathorizedError() {
    return new ErrorApi(401, 'Пользователь не авторизован')
  }

  static articleExist() {
    return new ErrorApi(11000, 'Новость с таким слагом уже существует')
  }

  static userUpdateFail(message: string) {
    return new ErrorApi(400, message)
  }

  static custom(code?: number | string) {
    const errors = [
      { code: -66, message: 'Папка, которую вы пытаетесь удалить, содержит файлы' },
      { code: 11000, message: 'Новость с таким слагом уже существует' },
    ]
    const message = errors.find(er => er.code == code)?.message || 'Не обработанная ошибка, сообщите разработчику'
    return new ErrorApi(400, message)
  }
}

export function isError(error: any): error is NodeJS.ErrnoException {
  return error instanceof Error
}
