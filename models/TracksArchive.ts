import { Schema, model, InferSchemaType } from 'mongoose'
import { Track } from './Track'

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
    ret.track = ret.trackId
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
