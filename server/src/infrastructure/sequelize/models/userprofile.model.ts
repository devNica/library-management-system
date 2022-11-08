import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeInstance from '../connection'
import { UserProfileEntity } from '../entities/UserProfile.entity'

export interface UserProfileAttrInput extends Optional<UserProfileEntity, 'createdAt'> {}
export interface UserProfileAttrOutput extends Required<UserProfileEntity> {}

export default class UserProfileModel extends Model<UserProfileAttrInput, UserProfileAttrOutput> implements UserProfileEntity {
  public fkProfile!: number
  public fkUser!: string
  public createdAt!: number
}

UserProfileModel.init({
  fkProfile: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'profile',
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
  modelName: 'user_profile',
  underscored: true
})
