import { Schema, model, InferSchemaType } from 'mongoose'

const TrackArchiveSchema = new Schema(
  {
    createdAt: { type: Schema.Types.Date, required: true },
    trackId: { type: Schema.Types.ObjectId, ref: 'Track' }
  },
  { timestamps: false, versionKey: false }
)

TrackArchiveSchema.set('toJSON', {
  versionKey: false,
  transform: function (_, ret) {
    //@ts-ignore
    ret.track = ret.trackId
    //@ts-ignore
    delete ret._id
    delete ret.trackId
  }
})

TrackArchiveSchema.virtual('track', {
  ref: 'Track',
  localField: 'trackId',
  foreignField: '_id',
  justOne: true
})

export type TrackArchive = InferSchemaType<typeof TrackArchiveSchema>
export const TrackArchive = model('ArchiveTrack', TrackArchiveSchema)
