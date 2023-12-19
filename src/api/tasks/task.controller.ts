import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { ITask } from './task.interface';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('add')
  async addTask(
    @Body() taskData: Partial<Task>,
    @Req() req: Express.Request,
  ): Promise<Task> {
    // @ts-ignore
    return this.taskService.createNewTask(taskData, req.user);
  }

  @Get()
  async taskList(
    @Req() req: Express.Request,
  ): Promise<{ data: Partial<ITask[]> }> {
    // @ts-ignore
    return this.taskService.getTaskList(req.user);
  }

  @Get('/:id')
  async getSingleTask(
    @Body() taskData: Partial<Task>,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.taskService.getSingleTaskDetail(id);
  }

  @Patch('update/:id')
  async updateTask(
    @Body() taskData: Partial<ITask>,
    @Param('id') id: string,
    @Req() req: Express.Request,
  ): Promise<[number, ITask]> {
    // @ts-ignore
    return this.taskService.updateTask(id, taskData, req.user);
  }

  @Delete('delete/:id')
  async deleteTask(
    @Param('id') id: string,
    @Req() req: Express.Request,
  ): Promise<number> {
    // @ts-ignore
    return this.taskService.deleteTask(+id, req.user);
  }
}
