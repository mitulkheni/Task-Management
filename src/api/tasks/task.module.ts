import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { tasksProviders } from './task.provider';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  providers: [TaskService, ...tasksProviders],
  exports: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
