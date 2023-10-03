import path from 'path'
import express, { Application, Request, Response } from 'express'
import userRoutes from '../routes/users'
import licenseRoutes from '../routes/licenses'
import clientRoutes from '../routes/clients'
import cors from 'cors'
import db from '../db/connection'
import migrateDatabase from '../db/migrate'

class Server {
  private app: Application
  private port: string
  private apiPath = {
    users: '/api/users',
    licenses: '/api/licenses',
    clients: '/api/clients'
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
      await migrateDatabase()
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
    this.app.use(this.apiPath.clients, clientRoutes)
    this.app.use('/*', express.static('public'))
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`server listening on port ${this.port}`)
    })
  }
}

export default Server
