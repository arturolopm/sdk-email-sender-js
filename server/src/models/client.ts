import { DataTypes } from 'sequelize'
import db from '../db/connection'
import User from './user'

const Client = db.define('Client', {
  poc_name: {
    type: DataTypes.STRING
  },
  poc_email: {
    type: DataTypes.STRING,
    unique: true
  },
  admin_poc: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
})

export default Client
