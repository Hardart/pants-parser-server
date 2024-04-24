import jwt from 'jsonwebtoken'
import { Token } from '../models/TokenModel'
import ErrorApi from '../handlers/error-api'
import { User } from '../models/UserModel'

class TokenService {
  generateTokens(payload: object) {
    const access = process.env.ACCESS_TOKEN
    const refresh = process.env.REFRESH_TOKEN
    if (!access || !refresh) throw ErrorApi.NoEnvVariable('access or refresh')
    const accessToken = jwt.sign(payload, access, { expiresIn: '1m', algorithm: 'HS512', noTimestamp: true })
    const refreshToken = jwt.sign(payload, refresh, { expiresIn: '1d' })
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await Token.create({ user: userId, refreshToken })
    return token
  }

  async clearToken(refreshToken: string) {
    const tokenData = await Token.deleteOne({ refreshToken })
    return tokenData
  }

  async getToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken })
    return tokenData
  }

  validateAccessToken(token: string) {
    try {
      const acces = process.env.ACCESS_TOKEN as string
      const userData = jwt.verify(token, acces) as User & { id: string }
      return userData
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const refresh = process.env?.REFRESH_TOKEN as string
      const userData = jwt.verify(token, refresh) as User & { id: string }
      return userData
    } catch (error) {
      return null
    }
  }
}

export default new TokenService()
