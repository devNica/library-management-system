import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeInstance from '../connection'
import { ProfileEntity } from '../entities/Profile.entity'

export interface ProfileAttrInput extends Optional<ProfileEntity, 'id' | 'isActive' | 'updatedAt'> {}
export interface ProfileAttrOutput extends Required<ProfileEntity> {}

export default class ProfileModel extends Model<ProfileEntity, ProfileAttrInput> implements ProfileEntity {
  public id!: number
  public profileName!: string
  public isActive!: boolean
  public createdAt!: number
  public updatedAt!: number
}

ProfileModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  profileName: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.BIGINT,
    allowNull: true
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'profile'
})
