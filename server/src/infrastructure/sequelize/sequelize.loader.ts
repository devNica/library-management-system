import { Sequelize } from 'sequelize'

import { ProfileModel, UserAccountModel, UserProfileModel } from './models/index'

export default async function sequelizeLoader (sequelizeInstance: Sequelize, migrate: boolean): Promise<void> {
  // GROUP MODEL
  ProfileModel.hasMany(UserProfileModel, { foreignKey: 'fk_profile', onDelete: 'RESTRICT' })

  // USER ACCOUNT MODEL
  UserAccountModel.hasMany(UserProfileModel, { foreignKey: 'fk_user', onDelete: 'RESTRICT' })

  // USER GROUP MODEL
  UserProfileModel.belongsTo(UserAccountModel, { foreignKey: 'fk_user' })
  UserProfileModel.belongsTo(ProfileModel, { foreignKey: 'fk_profile' })

  if (migrate) {
    await sequelizeInstance.sync({ alter: true })
      .then(_res => {
        console.log('all model have been created')
      }).catch(err => console.error(err))
  }
}
