import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { Request } from 'express';
import { SessionUser } from '../interfaces/session-user.interface';
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>() as Request & {
      session: SessionUser;
      currentUser?: any;
    };
    // récupérer le user id
    const { id } = request.session || {};

    if (id) {
      // retrouver le bon user
      const user = await this.usersService.findUserById(id);

      // assigner le user à un champ de la requete
      request.currentUser = user;
    }

    // continuer le cycle de vie de la requete
    return next.handle();
  }
}
