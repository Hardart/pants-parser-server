import { Schema, model, InferSchemaType, MongooseDocumentMiddleware } from 'mongoose'
import ErrorApi from '../handlers/error-api'
// import ErrorApi from '../handlers/error-api'

const ArticleSchema = new Schema(
  {
    title: String,
    slug: String,
    image: String,
    content: String,
    publishAt: { type: Schema.Types.Date, default: new Date(), required: true },
    isPublished: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    tags: [String],
  },
  { timestamps: true, versionKey: false }
)

ArticleSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    ret.category = ret.categoryId
    if (ret.category.slug) ret.url = `/${ret.category.slug}/${ret.slug}`
    delete ret._id
    delete ret.categoryId
  },
})

ArticleSchema.post('save', function (error: NodeJS.ErrnoException, _: MongooseDocumentMiddleware, next: any) {
  if (error.name === 'MongoServerError') {
    next(ErrorApi.custom(error.code))
  } else {
    next()
  }
})

export type Article = InferSchemaType<typeof ArticleSchema>
export type ArticleWithID = Article & { id: string }
export const Article = model('Article', ArticleSchema)
