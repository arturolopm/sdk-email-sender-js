import { DataTypes } from 'sequelize'
import db from '../db/connection'
import License from './license'

const EmailSent = db.define('EmailSent', {
  sent_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Default value is the current timestamp
  }
})

EmailSent.belongsTo(License, {
  foreignKey: {
    name: 'license_id',
    allowNull: false
  },
  onDelete: 'CASCADE'
})

export default EmailSent
