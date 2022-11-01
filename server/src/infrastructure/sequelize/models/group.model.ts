import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeInstance from '../connection'
import { GroupEntity } from '../entities/Group.entity'

export interface GroupAttrInput extends Optional<GroupEntity, 'id' | 'isActive' | 'updatedAt'> {}
export interface GroupAttrOutput extends Required<GroupEntity> {}

export default class GroupModel extends Model<GroupEntity, GroupAttrInput> implements GroupEntity {
  public id!: number
  public groupName!: string
  public isActive!: boolean
  public createdAt!: number
  public updatedAt!: number
}

GroupModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  groupName: {
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
  modelName: 'group'
})
