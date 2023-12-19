import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from 'src/utils/jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    const decodedToken = this.jwtService.verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decodedToken;

    next();
  }
}
