import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

/*export const db = new pg.Pool({
  user: 'wilkermizael',//'bootcamp_role',
  host:'localhost',
  database:'boardcamp',
  password:'153',
  port:5432

})*/
const { Pool } = pg

const configDatabase = {
  
  connectionString: process.env.DATABASE_URL,
}

export const db = new Pool(configDatabase)
