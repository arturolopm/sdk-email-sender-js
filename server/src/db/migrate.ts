const { execSync } = require('child_process')

const migrateDatabase = () => {
  console.log('Running database migration...')
  try {
    execSync('npx sequelize-cli db:migrate')
    console.log('Database migration completed.')
  } catch (error) {
    console.error('Error running database migration:', error)
    process.exit(1)
  }
}
export default migrateDatabase
