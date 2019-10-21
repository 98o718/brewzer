import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  Patch,
} from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { RecipesService } from './recipes.service'
import { Recipe } from './interfaces/recipe.interface'
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { FindRecipeDto } from './dto/find-recipe.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../auth/get-user.decorator'
import { UserInfo } from '../users/interfaces/user-info.interface'
import { AuthInterceptor } from '../auth/auth.interceptor'

@Controller('recipes')
@ApiUseTags('Recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ title: 'Create recipe' })
  async create(
    @Body(ValidationPipe)
    createRecipeDto: CreateRecipeDto,
    @GetUser() user: UserInfo,
  ): Promise<Recipe> {
    return this.recipesService.create(createRecipeDto, user)
  }

  @UseInterceptors(AuthInterceptor)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ title: 'Get all accessible recipes' })
  async findAll(
    @Query(ValidationPipe) findRecipeDto: FindRecipeDto,
    @GetUser() user: UserInfo | null,
  ): Promise<Recipe[]> {
    return await this.recipesService.findAll(findRecipeDto, user)
  }

  @UseInterceptors(AuthInterceptor)
  @ApiBearerAuth()
  @Get('user/:username')
  @ApiOperation({ title: "Get all user's recipes" })
  async findAllByUser(
    @Query(ValidationPipe) findRecipeDto: FindRecipeDto,
    @GetUser() user: UserInfo | null,
    @Param('username') username: string,
  ): Promise<Recipe[]> {
    return await this.recipesService.findAllByUser(
      findRecipeDto,
      user,
      username,
    )
  }

  @UseInterceptors(AuthInterceptor)
  @Get('/:id')
  @ApiBearerAuth()
  @ApiOperation({ title: 'Get recipe by ID' })
  async findById(
    @Param('id') id: string,
    @GetUser() user: UserInfo | null,
  ): Promise<Recipe> {
    return await this.recipesService.findById(id, user)
  }

  @Get('/private/:url')
  @ApiOperation({ title: 'Get private recipe by URL' })
  async findByUrl(@Param('url') url: string): Promise<Recipe> {
    return await this.recipesService.findByUrl(url)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch('change-type/:id')
  @ApiOperation({ title: 'Change recipe type' })
  async changeType(
    @Param('id') id: string,
    @GetUser() user: UserInfo,
  ): Promise<Recipe> {
    return await this.recipesService.changeType(id, user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch('edit/:id')
  @ApiOperation({ title: 'Edit recipe' })
  async edit(
    @Param('id') id: string,
    @GetUser() user: UserInfo,
    @Body(ValidationPipe) editRecipeDto: CreateRecipeDto,
  ): Promise<Recipe> {
    return await this.recipesService.edit(id, user, editRecipeDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiOperation({ title: 'Delete recipe by ID' })
  async delete(
    @Param('id') id: string,
    @GetUser() user: UserInfo,
  ): Promise<void> {
    await this.recipesService.delete(id, user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('my')
  @ApiOperation({ title: "Delete all user's recipes" })
  async deleteAllByUser(@GetUser() user: UserInfo): Promise<void> {
    await this.recipesService.deleteAllByUser(user)
  }
}
