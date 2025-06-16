import { after } from "node:test";
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "users", //uta gui ma dekhinen kura ho
  modelName: "User", //project  vitra mathi ko table lai access agrne name
  timestamps: true,
})
class User extends Model {
  //convention is classname = modelName
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.ENUM("teacher", "institute", "super-admin", "student"),
    defaultValue: "student",
  })
  declare role: string;

  @Column({
    type: DataType.STRING,
  })
  declare currentInstituteNumber: string;
}
export default User;
