import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GeneralError } from '../exception/base.exception';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    request.headers.timemark = new Date().getTime().toString();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new GeneralError('AUTHENTICATION_FORBIDDEN');
    }
    const token = authHeader.slice(7);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET ?? 'default_secret_change_me',
      });
      (request as any).user = payload;
      if (request.body && typeof request.body === 'object') {
        request.body.userId = payload.sub;
        request.body.username = payload.username;
      }
    } catch {
      throw new GeneralError('AUTHENTICATION_BLOCKED');
    }

    return true;
  }
}
