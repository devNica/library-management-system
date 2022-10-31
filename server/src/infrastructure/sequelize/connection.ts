import { Sequelize } from 'sequelize'
import databaseConfig from '../db/config'

const db = databaseConfig()

const sequelizeInstance = new Sequelize(db.database, db.user, db.password, db.options)

export default sequelizeInstance
