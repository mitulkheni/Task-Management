import { Sequelize } from 'sequelize-typescript';
import databaseConfig from './database.config';
import User from 'src/api/user/user.entity';
import Task from 'src/api/tasks/task.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([User, Task]);
      await sequelize.sync({ force: false });
      return sequelize;
    },
  },
];
