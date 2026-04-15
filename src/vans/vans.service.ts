import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '@app/users/users.service';
import { CreateVanDto } from './dtos/create-van.dto';
import { Van, VanType } from '@app/entities/van.entity';

@Injectable()
export class VansService {
  constructor(
    @InjectRepository(Van)
    private readonly vansRepository: Repository<Van>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(type?: string) {
    const vans = await this.vansRepository.find({
      where: type ? { type: type as VanType } : undefined,
      relations: { host: true },
      order: { createdAt: 'DESC' },
    });
    return vans;
  }

  async findOne(id: string) {
    return await this.getVanOrThrow(id);
  }

  async findVanForUser(userId: string) {
    const user = await this.usersService.findUserById(userId);
    const vans = await this.vansRepository.find({
      where: { host: { id: user.id } },
      relations: { host: true },
      order: { createdAt: 'DESC' },
    });

    return vans;
  }

  async findUserVan(userId: string, vanId: string) {
    const van = await this.getVanOrThrow(vanId);
    console.log(
      'Van found:',
      'Host ID:',
      van.host.id,
      'User ID:',
      userId,
      typeof van.host.id,
      typeof userId,
    );
    if (van.host.id !== userId) {
      throw new NotFoundException('Van not found for this user.');
    }

    return van;
  }

  async create(van: CreateVanDto, hostId: string) {
    const host = await this.usersService.findUserById(hostId);
    const newVan = this.vansRepository.create({ ...van, host });

    return await this.vansRepository.save(newVan);
  }

  async assertHostOwnsVan(hostId: string, vanId: string) {
    const van = await this.getVanOrThrow(vanId);

    if (van.host.id !== hostId) {
      throw new ForbiddenException('You do not have access to this van.');
    }

    return van;
  }

  private async getVanOrThrow(id: string) {
    const van = await this.vansRepository.findOne({
      where: { id },
      relations: { host: true },
    });

    if (!van) {
      throw new NotFoundException(`Van ${id} not found.`);
    }

    return van;
  }
}
