import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from './config/database/database.config';
import { UserModule } from './api/user/user.module';
import { DatabaseModule } from './config/database/databasae.module';
import { JwtService } from './utils/jwt.service';
import { AuthMiddleware } from './utils/auth.middleware';
import { TaskModule } from './api/tasks/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot(databaseConfig),
    DatabaseModule,
    UserModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/tasks');
  }
}
