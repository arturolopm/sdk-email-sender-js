import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const dbname = process.env.DB_NAME || 'mydb'
const dbUser = process.env.DB_USER || 'root'
const dbPass = process.env.DB_PASS || 'root'
const dbHost = process.env.DB_HOST || 'mariadb'

console.log(dbname, dbUser, dbPass, dbHost)

const db = new Sequelize(dbname!, dbUser!, dbPass!, {
  host: dbHost,
  port: 3306,
  dialect: 'mariadb'
})

export default db
