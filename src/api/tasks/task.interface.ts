import { IBaseInterface } from 'src/utils/interface';

export interface ITask extends IBaseInterface {
  title: string;
  description: string;
  completedAt?: Date;
  status: string;
  userId: number;
  isDeleted: boolean;
}
