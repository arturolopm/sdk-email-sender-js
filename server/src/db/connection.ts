import { Sequelize } from 'sequelize'
const dbname = process.env.DB_NAME || 'mydb'
const dbUser = process.env.DB_USER || 'root'
const dbPass = process.env.DB_PASS || 'root'

const db = new Sequelize('mydb', 'root', 'root', {
  host: 'mariadb',
  port: 3306,
  dialect: 'mariadb'
})

export default db
