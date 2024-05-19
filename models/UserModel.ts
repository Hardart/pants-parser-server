import mongoose, { Schema, model, InferSchemaType } from 'mongoose'

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: String,
    roles: { type: [String], default: ['editor'], required: true }
  },
  {
    timestamps: false,
    versionKey: false
  }
)

UserSchema.set('toJSON', {
  versionKey: false,
  virtuals: true
})

UserSchema.virtual('fullName').get(function () {
  return this.lastName + ' ' + this.firstName
})

export type User = InferSchemaType<typeof UserSchema> & { fullName?: string }
export const User = model('User', UserSchema)
