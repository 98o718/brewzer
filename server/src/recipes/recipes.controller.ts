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
import { GetUser } from '../auth/decorators/get-user.decorator'
import { UserInfo } from '../users/interfaces/user-info.interface'
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor'
import { RateRecipeDto } from './dto/rate-recipe.dto'
import { userInfo } from 'os'
import { SelectRecipesDto } from './dto/select-recipes.dto'

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

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('/copy')
  @ApiOperation({ title: 'Copy recipe' })
  async copy(
    @Body(ValidationPipe)
    createRecipeDto: CreateRecipeDto,
    @GetUser() user: UserInfo,
  ): Promise<Recipe> {
    return this.recipesService.copy(createRecipeDto, user)
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

  @Get('/popular')
  @ApiOperation({ title: 'Get popular recipes' })
  async findPopular(): Promise<Recipe[]> {
    return await this.recipesService.findPopular()
  }

  @Get('/new')
  @ApiOperation({ title: 'Get new recipes' })
  async findNew(): Promise<Recipe[]> {
    return await this.recipesService.findNew()
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

  @Post('search')
  @ApiOperation({ title: 'Select recipes' })
  async select(@Body(ValidationPipe) selectRecipesDto: SelectRecipesDto) {
    return await this.recipesService.select(selectRecipesDto)
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

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id')
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
  @Patch('/rate/:id')
  @ApiOperation({ title: 'Rate recipe' })
  async rate(
    @Param('id') id: string,
    @GetUser() user: UserInfo,
    @Body(ValidationPipe) rateRecipeDto: RateRecipeDto,
  ): Promise<Recipe> {
    return await this.recipesService.rate(id, user, rateRecipeDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ title: 'Delete recipe by ID' })
  async delete(
    @Param('id') id: string,
    @GetUser() user: UserInfo,
  ): Promise<void> {
    await this.recipesService.delete(id, user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('/favorite')
  @ApiOperation({ title: "Get user's favorites" })
  async findFavorites(@GetUser() user: UserInfo): Promise<Recipe[]> {
    return await this.recipesService.findFavorites(user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('my')
  @ApiOperation({ title: "Delete all user's recipes" })
  async deleteAllByUser(@GetUser() user: UserInfo): Promise<void> {
    await this.recipesService.deleteAllByUser(user)
  }
}
