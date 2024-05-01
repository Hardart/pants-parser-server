import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config({ path: __dirname + '/.env' })

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
