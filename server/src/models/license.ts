import { DataTypes } from 'sequelize'
import db from '../db/connection'
import Client from './client'

const License = db.define('License', {
  package: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['javascript_sdk', 'ios_sdk', 'android_sdk']]
    }
  },
  license_type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['production', 'evaluation']]
    }
  },

  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client, // Reference the Client model
      key: 'id'
    }
  },
  created_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  expiration_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days in milliseconds
  }
})
License.belongsTo(Client, {
  foreignKey: 'client_id',
  onDelete: 'CASCADE'
})
export default License
