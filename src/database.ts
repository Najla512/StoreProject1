import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
let client=new Pool()

const { 
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
 } = process.env

 if(ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database:POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

if(ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

export default client