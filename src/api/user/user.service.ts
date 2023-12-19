import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { verifyPassword } from 'src/utils/password';
import { IUser } from './user.interface';
import { JwtService } from 'src/utils/jwt.service';
import { DATABASE_REPOSITORY } from 'src/common/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_REPOSITORY.USER_REPOSITORY)
    private readonly userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(): Promise<{ user: Partial<User>; token: string }> {
    const user = await this.userRepository.create({
      email: 'test@example.com',
      password: '1234567890',
    });

    const tokenPayload = { id: user.id };
    const token = this.jwtService.generateToken(tokenPayload);

    return { user: this.sanitizeUser(user), token };
  }

  async login(
    userData: IUser,
  ): Promise<{ user: Partial<User> | null; token: string }> {
    const { email, password } = userData;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (isPasswordValid) {
      const tokenPayload = { id: user.id };
      const token = this.jwtService.generateToken(tokenPayload);
      return { user: this.sanitizeUser(user), token };
    } else {
      throw new BadRequestException('Password does not match');
    }
  }

  private sanitizeUser(user: User): Partial<User> {
    const { password, ...sanitizedUser } = user.toJSON() as User;
    return sanitizedUser;
  }
}
