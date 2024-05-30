import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
const envPath = process.env.NODE_ENV === 'production' ? path.join(__dirname, '..', '/.env') : __dirname + '/.env'
// const envPath = path.join(__dirname, '..', '/.env')
dotenv.config({ path: envPath })

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB || '')
    console.log('====================================')
    console.log(`БД подключена`)
    console.log('====================================')
  } catch (error) {
    console.log('====================================')
    console.error(`ERROR: Ошибка при подключении к БД!!!`)
  }
}
