import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../auth/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  createUser(user: CreateUserDto) {
    const newUser = this.repo.create(user);
    return this.repo.save(newUser);
  }

  async findUserById(id: string) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  findAllUsers() {
    return this.repo.find();
  }

  async removeUser(id: string) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return await this.repo.remove(user);
  }

  async updateUser(id: string, attrs: Partial<User>) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs);
    return await this.repo.update(id, attrs);
  }

  async findUserByEmail(email: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  async isEmailInUse(email: string) {
    const user = await this.repo.findOneBy({ email });
    return !!user;
  }
}
