import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './user.provider';
import { JwtService } from 'src/utils/jwt.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, ...usersProviders, JwtService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
