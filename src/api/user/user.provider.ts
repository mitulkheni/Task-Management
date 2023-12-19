import { DATABASE_REPOSITORY } from 'src/common/constants';
import { User } from './user.entity';

export const usersProviders = [
  {
    provide: DATABASE_REPOSITORY.USER_REPOSITORY,
    useValue: User,
  },
];
