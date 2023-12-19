import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { IUser } from '../user/user.interface';
import { ITask } from './task.interface';
import { DATABASE_REPOSITORY } from 'src/common/constants';

@Injectable()
export class TaskService {
  constructor(
    @Inject(DATABASE_REPOSITORY.TASK_REPOSITORY)
    private readonly taskRepository: typeof Task,
  ) {}

  async createNewTask(taskData: Partial<Task>, user: IUser): Promise<Task> {
    taskData.userId = +user.id;
    return this.taskRepository.create(taskData);
  }

  async getTaskList(user: IUser): Promise<Task[]> {
    return this.taskRepository.findAll({
      where: { userId: user.id, isDeleted: false },
    });
  }

  async getSingleTaskDetail(id: string): Promise<Task | null> {
    const task = await this.taskRepository.findByPk(id);

    if (!task || task.isDeleted) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async updateTask(
    id: string,
    taskData: Partial<ITask>,
    user: IUser,
  ): Promise<Task | null> {
    const task = await this.taskRepository.findByPk(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== +user.id) {
      throw new UnauthorizedException(
        'You are not authorized to update this task',
      );
    }

    if (task.isDeleted) {
      throw new NotFoundException('Task not found');
    }

    const [affectedCount] = await this.taskRepository.update(taskData, {
      where: { id, userId: user.id, isDeleted: false },
    });

    if (affectedCount === 0) {
      throw new InternalServerErrorException('Something went wrong');
    }

    const updatedTask = await this.taskRepository.findByPk(id);
    return updatedTask;
  }

  async deleteTask(id: string, user: IUser): Promise<string> {
    const task = await this.taskRepository.findByPk(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== +user.id) {
      throw new UnauthorizedException(
        'You are not authorized to delete this task',
      );
    }

    await this.taskRepository.update(
      { isDeleted: true },
      { where: { id, userId: user.id } },
    );

    return 'Task has been deleted';
  }
}
