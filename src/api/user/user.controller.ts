import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { IUser } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(): Promise<{ user: Partial<User>; token: string }> {
    return this.userService.createUser();
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() userData: IUser,
  ): Promise<{ user: Partial<User>; token: string }> {
    return this.userService.login(userData);
  }
}
