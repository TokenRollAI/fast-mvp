import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { helloTable } from './schema/hello'

const db = drizzle({
  connection: {
    url: process.env.DB_FILE_NAME || 'file:local.db',
  },
})

export { db, helloTable }
