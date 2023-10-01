'use strict'
const fs = require('fs')
const path = require('path')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email_address: {
        type: Sequelize.STRING
      },
      isStaff: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })

    await queryInterface.createTable('Clients', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      poc_name: {
        type: Sequelize.STRING
      },
      poc_email: {
        type: Sequelize.STRING
      },
      admin_poc: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })

    await queryInterface.createTable('Licenses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      package: {
        type: Sequelize.STRING,
        allowNull: false
      },
      license_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_datetime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expiration_datetime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
    // Function to read and insert data from CSV file
    const insertFromCSV = async (tableName, fileName, columnMappings) => {
      const filePath = path.join(__dirname, '../seeders', fileName)
      const data = fs.readFileSync(filePath, 'utf8')
      const records = data.split('\n').map((line) => line.split(','))

      const header = records.shift() // Remove the header line
      const columnIndexMap = {}

      // Create a mapping of CSV column indexes to database column names
      header.forEach((column, index) => {
        const dbColumnName = columnMappings[column] || column
        columnIndexMap[index] = dbColumnName
      })
      records.pop()

      const bulkInsertData = records.map((record) => {
        const dataRow = {}
        record.forEach((value, index) => {
          const dbColumnName = columnIndexMap[index]
          dataRow[dbColumnName] = value
        })

        dataRow.createdAt = new Date()
        dataRow.updatedAt = new Date()

        return dataRow
      })

      await queryInterface.bulkInsert(tableName, bulkInsertData, {})
    }

    // Insert data from users.csv with column mappings
    await insertFromCSV('Users', 'users.csv', {
      id: 'id',
      first_name: 'first_name',
      last_name: 'last_name',
      email_address: 'email_address',
      isStaff: 'isStaff'
    })

    // Insert data from clients.csv with column mappings
    await insertFromCSV('Clients', 'clients.csv', {
      // id: 'id',
      poc_name: 'poc_name',
      poc_email: 'poc_email',
      admin_poc: 'admin_poc'
    })

    // Insert data from licenses.csv with column mappings
    await insertFromCSV('Licenses', 'licenses.csv', {
      // id: 'id',
      package: 'package',
      license_type: 'license_type',
      created_datetime: 'created_datetime',
      expiration_datetime: 'expiration_datetime',
      client_id: 'client_id'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Licenses')
    await queryInterface.dropTable('Clients')
    await queryInterface.dropTable('Users')
  }
}
