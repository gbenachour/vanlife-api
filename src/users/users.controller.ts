import {
  Body,
  Controller,
  Patch,
  Param,
  Get,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from '../auth/dtos/user.dto';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { AuthGuard } from '../common/guards/auth.guard';
import { VansService } from '@app/vans/vans.service';
// import { CreateUserDto } from '../auth/dtos/create-user.dto';
// import { AuthService } from './services/auth.service';
// import { CurrentUser } from '../common/decorators/current-user.decorator';
// import { User } from '../entities';
// import { LoginUserDto } from '../auth/dtos/login-user.dto';
// import { UserSessionDto } from '../auth/dtos/user-session.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private vansService: VansService,
  ) {}

  @Serialize(UserDto)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }

  // @Get()
  // findAllUsers() {
  //   return this.usersService.findAllUsers();
  // }

  @Get('/:userId/vans')
  async findUserVans(@Param('userId') userId: string) {
    return this.vansService.findVanForUser(userId);
  }

  @Get('/:userId/vans/:id')
  async findUserVan(@Param('userId') userId: string, @Param('id') id: string) {
    return this.vansService.findUserVan(userId, id);
  }
}
