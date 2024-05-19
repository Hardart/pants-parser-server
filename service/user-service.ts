import { User } from '../models/UserModel'

class UserService {
  async getAll() {
    return await User.find().select('-password')
  }

  async getHosts() {
    return await User.find({ roles: 'host' }).select('-password')
  }

  async findById(id: string) {
    return await User.findById(id)
  }
}

export default new UserService()
