import { DataTypes, Model, Optional, NOW } from 'sequelize'
import sequelizeInstance from '../connection'
import { UserAccountEntity } from '../entities/UserAccount.entity'

export interface UserAccountAttrInput extends Optional<UserAccountEntity, 'id' | 'isActive' | 'resetPassword' | 'updatedAt'> {}
export interface UserAccountAttrOutput extends Required<UserAccountEntity> {}

export default class UserAccountModel extends Model<UserAccountEntity, UserAccountAttrInput> implements UserAccountEntity {
  public id!: string
  public email!: string
  public password!: string
  public fullname!: string
  public phoneNumber!: string
  public resetPassword!: boolean
  public expiresIn!: number
  public isRoot!: boolean
  public isActive!: boolean
  public createdAt!: number
  public updatedAt!: number
}

UserAccountModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullname: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  resetPassword: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  expiresIn: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isRoot: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: NOW()
  },
  updatedAt: {
    type: DataTypes.BIGINT,
    allowNull: true
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'user_account'
})
