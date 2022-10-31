import { Sequelize } from 'sequelize'

export default async function sequelizeLoader (sequelizeInstance: Sequelize, migrate: boolean): Promise<void> {
  if (migrate) {
    await sequelizeInstance.sync({ alter: true })
      .then(_res => {
        console.log('all model have been created')
      }).catch(err => console.error(err))
  }
}
