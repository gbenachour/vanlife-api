import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionUser } from '../interfaces/session-user.interface';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>() as Request & {
      session: SessionUser;
    };
    if (!request.session.id) {
      throw new UnauthorizedException('You must log in first.');
    }

    return true;
  }
}
