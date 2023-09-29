import express, { Application } from 'express'
import userRoutes from '../routes/users'
import licenseRoutes from '../routes/licenses'
import cors from 'cors'
import db from '../db/connection'

class Server {
  private app: Application
  private port: string
  private apiPath = {
    users: '/api/users',
    licenses: '/api/licenses'
  }
  constructor() {
    this.app = express()
    this.port = process.env.PORT || '8080'
    // init
    this.dbConnection()
    this.middlewares()
    this.routes()
  }

  async dbConnection() {
    try {
      await db.authenticate()
      await db.sync()
      const dbName = db.getDatabaseName()

      console.log(`connected to database ${dbName}`)
    } catch (error) {
      throw new Error(error as string)
    }
  }

  middlewares() {
    //cors
    this.app.use(cors({}))
    // Bodyparser
    this.app.use(express.json())

    //public
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.apiPath.users, userRoutes)
    this.app.use(this.apiPath.licenses, licenseRoutes)
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`server listening on port ${this.port}`)
    })
  }
}

export default Server
