import { DataTypes } from 'sequelize'
import db from '../db/connection'

const User = db.define('User', {
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  isStaff: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  poc_contact_name: {
    type: DataTypes.STRING
  },
  poc_contact_email: {
    type: DataTypes.STRING
  },
  admin_poc: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    }
  }
})

export default User
