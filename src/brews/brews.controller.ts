import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'
import { BrewsService } from './brews.service'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger'
import { GetUser } from '../auth/get-user.decorator'
import { UserInfo } from '../users/interfaces/user-info.interface'
import { CreateBrewDto } from './dto/create-brew.dto'
import { Brew } from './interfaces/brew.interface'

@Controller('brews')
@ApiUseTags('Brews')
export class BrewsController {
  constructor(private readonly brewsService: BrewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ title: 'Create brew' })
  async create(
    @Body(ValidationPipe) createBrewDto: CreateBrewDto,
    @GetUser() user: UserInfo,
  ): Promise<Brew> {
    return await this.brewsService.create(createBrewDto, user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ title: "Get all user's brews" })
  async findAll(@GetUser() user: UserInfo): Promise<Brew[]> {
    return await this.brewsService.findAll(user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ title: 'Get brew by id' })
  async findById(
    @Param('id') id: string,
    @GetUser() user: UserInfo,
  ): Promise<Brew> {
    return await this.brewsService.findById(id, user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ title: 'Edit brew' })
  async edit(
    @Param('id') id: string,
    @Body(ValidationPipe) createBrewDto: CreateBrewDto,
    @GetUser() user: UserInfo,
  ): Promise<Brew> {
    return await this.brewsService.edit(id, createBrewDto, user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ title: 'Delete brew by id' })
  async deleteById(
    @Param('id') id: string,
    @GetUser() user: UserInfo,
  ): Promise<void> {
    await this.brewsService.deleteById(id, user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete()
  @ApiOperation({ title: "Delete all user's brews" })
  async deleteAll(@GetUser() user: UserInfo): Promise<void> {
    await this.brewsService.deleteAll(user)
  }
}
