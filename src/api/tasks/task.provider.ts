import { DATABASE_REPOSITORY } from 'src/common/constants';
import { Task } from './task.entity';

export const tasksProviders = [
  {
    provide: DATABASE_REPOSITORY.TASK_REPOSITORY,
    useValue: Task,
  },
];
