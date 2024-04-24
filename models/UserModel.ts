import { Schema, model, InferSchemaType } from 'mongoose'

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    avatar: String,
    roles: { type: Array, default: ['user'], required: true },
  },
  { toObject: { virtuals: true }, versionKey: false, timestamps: true }
)

export type User = InferSchemaType<typeof UserSchema>
export const User = model('User', UserSchema)
