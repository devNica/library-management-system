import { Sequelize } from 'sequelize'

import { GroupModel, UserAccountModel, UserGroupModel } from './models/index'

export default async function sequelizeLoader (sequelizeInstance: Sequelize, migrate: boolean): Promise<void> {
  // GROUP MODEL
  GroupModel.hasMany(UserGroupModel, { foreignKey: 'fk_group', onDelete: 'RESTRICT' })

  // USER ACCOUNT MODEL
  UserAccountModel.hasMany(UserGroupModel, { foreignKey: 'fk_user', onDelete: 'RESTRICT' })

  // USER GROUP MODEL
  UserGroupModel.belongsTo(UserAccountModel, { foreignKey: 'fk_user' })
  UserGroupModel.belongsTo(GroupModel, { foreignKey: 'fk_group' })

  if (migrate) {
    await sequelizeInstance.sync({ alter: true })
      .then(_res => {
        console.log('all model have been created')
      }).catch(err => console.error(err))
  }
}
