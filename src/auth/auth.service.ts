import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { hashPassword, compareHash } from '@app/common/helpers';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(user: CreateUserDto) {
    const emailInUse = await this.usersService.isEmailInUse(user.email);
    if (emailInUse) {
      throw new BadRequestException('email in use');
    }
    const hashedPassword = await hashPassword(user.password);

    const newUser = await this.usersService.createUser({
      ...user,
      password: hashedPassword,
    });

    return newUser;
  }

  async signin(email: string, rawPassword: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isPasswordValid = await compareHash(rawPassword, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('invalid password');
    }

    return user;
  }
}
