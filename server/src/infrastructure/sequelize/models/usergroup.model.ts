import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeInstance from '../connection'
import { UserGroupEntity } from '../entities/UserGroup.entity'

export interface UserGroupAttrInput extends Optional<UserGroupEntity, 'createdAt'> {}
export interface UserGroupAttrOutput extends Required<UserGroupEntity> {}

export default class UserGroupModel extends Model<UserGroupAttrInput, UserGroupAttrOutput> implements UserGroupEntity {
  public fkGroup!: number
  public fkUser!: string
  public createdAt!: number
}

UserGroupModel.init({
  fkGroup: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'group',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  fkUser: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'user_account',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  createdAt: {
    type: DataTypes.BIGINT,
    defaultValue: Date.now(),
    allowNull: false
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'user_groups',
  underscored: true
})
