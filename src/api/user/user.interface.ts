import { IBaseInterface } from 'src/utils/interface';

export interface IUser extends IBaseInterface {
  email: string;
  password: string;
}
