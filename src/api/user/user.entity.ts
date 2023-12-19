import { Table, Column, Model, BeforeCreate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { IUser } from './user.interface';

@Table
export class User extends Model<IUser> {
  @Column({
    unique: true,
  })
  email: string;

  @Column
  password: string;

  @BeforeCreate
  static async hashPassword(instance: User) {
    const hashedPassword = await bcrypt.hash(instance.password, 10);
    instance.password = hashedPassword;
  }
}

export default User;
