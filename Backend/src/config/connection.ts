import { Pool } from 'pg'
import env from 'dotenv'

import { formatError } from '../utils/formatError'

env.config()

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

const verifiConnection = async () => {
  const nameDB = process.env.DB_NAME
  try {
    const connect = await pool.connect()
    console.log(`[+] Database connection established successfully :) `)
    console.log(`[+] Database "${nameDB}"`)
    connect.release()
  } catch (error) {
    console.log('[-] Failed to connect to the database')
    formatError(error)
    process.exit(1)
  }
}

process.on('SIGINT', async () => {
  console.log('\n[!] Closing database connection...')  
  await pool.end()
  console.log('[!] Database connection closed!')
  process.exit(0)
})

verifiConnection()
