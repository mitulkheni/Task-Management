import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  private readonly secretKey = process.env.JWTKEY;

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }
}
