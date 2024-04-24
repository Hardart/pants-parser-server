import { Article, ArticleWithID } from '../models/Article'
import { Category } from '../models/Category'
import { Tag } from '../models/Tag'
import type { QueryParams } from '../types/custom-request'

class ArticleService {
  async all() {
    const articles = await Article.find()
      .select('title slug tags  createdAt isPublished publishAt')
      .populate({ path: 'categoryId', select: 'title slug' })
    return articles
  }

  async list({ filter, sort, limit, page }: QueryParams) {
    const cats = await Category.find({ isPublished: true })

    const articles = await Article.find({ $and: [...filter, { categoryId: { $in: cats } }] })
      .select('title slug image createdAt')
      .populate({ path: 'categoryId', select: 'title slug' })
      .skip(page * limit)
      .limit(limit)
      .sort(sort)
    return articles
  }

  async count({ filter }: QueryParams) {
    return await Article.find({ $and: filter }).countDocuments()
  }

  async countAll() {
    return await Article.countDocuments()
  }

  async findBySlug(slug: string) {
    return await Article.findOne({ slug }).populate('categoryId')
  }

  async findById(id: string) {
    return await Article.findById(id).populate('categoryId')
  }

  async findByTag(tagTitle: string) {
    return await Tag.findOne({ title: tagTitle }).populate('articles')
  }

  async add(data: Article) {
    data.tags.forEach(async tag => await Tag.updateOne({ title: tag }, { title: tag }, { upsert: true }))
    const article = new Article(data)
    await article.save()
  }

  async updateOne(data: ArticleWithID) {
    data.tags.forEach(async tag => await Tag.updateOne({ title: tag }, { title: tag }, { upsert: true }))
    return await Article.findByIdAndUpdate(data.id, data, { new: true }).populate('categoryId')
  }

  async deleteOne(id: string) {
    return await Article.findByIdAndDelete(id)
  }
}

export default new ArticleService()
