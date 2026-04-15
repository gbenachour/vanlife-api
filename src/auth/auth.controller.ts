import {
  Body,
  Controller,
  Post,
  Get,
  Session,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../entities';
import { AuthGuard } from '../common/guards/auth.guard';
import { LoginUserDto } from './dtos/login-user.dto';
import { type SessionUser } from '@app/common/interfaces/session-user.interface';
import { type Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(
    @Body() user: CreateUserDto,
    @Session() session: SessionUser,
  ) {
    const newUser = await this.authService.signup(user);
    session.id = newUser.id;
    return newUser;
  }

  @Post('/signin')
  async signin(@Body() body: LoginUserDto, @Session() session: SessionUser) {
    const user = await this.authService.signin(body.email, body.password);
    session.id = user.id;
    return user;
  }

  @Serialize(UserDto)
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Req() req: Request) {
    req.session = null;
    return { message: 'Logged out successfully' };
  }
}
