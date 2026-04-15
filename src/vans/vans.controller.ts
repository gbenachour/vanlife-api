import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreateVanDto } from './dtos/create-van.dto';
import { VansService } from './vans.service';
import { type SessionUser } from '@app/common/interfaces/session-user.interface';

@Controller('vans')
export class VansController {
  constructor(private readonly vansService: VansService) {}

  @Get()
  async findAll(@Query('type') type?: string) {
    return this.vansService.findAll(type);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vansService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() van: CreateVanDto, @Session() session: SessionUser) {
    if (!session.id) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.vansService.create(van, session.id);
  }

  // @Get('users/me/vans')
  // @UseGuards(AuthGuard)
  // async findCurrentUserVans(@Req() request: Request) {
  //   return this.vansService.findForUser(request.session.user!.id);
  // }

  // @Get('users/me/vans/:id')
  // @UseGuards(AuthGuard)
  // async findCurrentUserVan(@Param('id') id: string, @Req() request: Request) {
  //   return this.vansService.findUserVan(request.session.user!.id, id);
  // }

  // @Get('users/:userId/vans')
  // async findUserVans(@Param('userId') userId: string) {
  //   return this.vansService.findForUser(userId);
  // }

  // @Get('users/:userId/vans/:id')
  // async findUserVan(@Param('userId') userId: string, @Param('id') id: string) {
  //   return this.vansService.findUserVan(userId, id);
  // }
}
