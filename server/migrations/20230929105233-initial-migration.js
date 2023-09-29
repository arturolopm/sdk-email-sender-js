'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.sequelize.query(
    //   `CREATE DATABASE ${process.env.DB_NAME || 'mydb'};`
    // )
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      isStaff: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      poc_contact_name: {
        type: Sequelize.STRING
      },
      poc_contact_email: {
        type: Sequelize.STRING
      },
      admin_poc: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
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
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
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

    // Add an index on user_id for better performance
    // await queryInterface.addIndex('Licenses', ['user_id'])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Licenses')
    await queryInterface.dropTable('users')
  }
}
