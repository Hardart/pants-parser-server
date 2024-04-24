import { Tag } from '../models/Tag'

class TagService {
  async list() {
    return (await Tag.find().select('title')).map(tag => tag.title)
  }
}

export default new TagService()
