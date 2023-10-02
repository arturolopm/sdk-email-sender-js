import { DataTypes } from 'sequelize'
import db from '../db/connection'
import License from './license'

const Email = db.define('Email', {
  sent_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Default value is the current timestamp
  }
})

Email.belongsTo(License, {
  foreignKey: {
    name: 'license_id',
    allowNull: false
  },
  onDelete: 'CASCADE'
})

export default Email
