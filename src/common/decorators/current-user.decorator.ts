import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '@app/auth/dtos/user.dto';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>() as Request & {
      currentUser?: UserDto;
    };
    return request.currentUser;
  },
);
