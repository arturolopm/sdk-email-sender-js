import { DataTypes } from 'sequelize'
import db from '../db/connection'

const User = db.define('User', {
  first_name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes.STRING
  },
  email_address: {
    type: DataTypes.STRING,
    defaultValue: false
  },
  isStaff: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

export default User
