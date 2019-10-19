import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { RecipesService } from './recipes.service'
import { Recipe } from './interfaces/recipe.interface'
import { ApiUseTags, ApiOperation } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { FindRecipeDto } from './dto/find-recipe.dto'
import { RecipeType } from './recipe-type.enum'

@Controller('recipes')
@ApiUseTags('Recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiOperation({ title: 'Create recipe' })
  async create(
    @Body(ValidationPipe)
    createRecipeDto: CreateRecipeDto,
  ) {
    return this.recipesService.create(createRecipeDto)
  }

  @Get()
  @ApiOperation({ title: 'Get all recipes' })
  async findAll(
    @Query(ValidationPipe) findRecipeDto: FindRecipeDto,
  ): Promise<Recipe[]> {
    return await this.recipesService.findAll(findRecipeDto)
  }

  @Get('/:id')
  @ApiOperation({ title: 'Get recipe by ID' })
  async findById(@Param('id') id: string): Promise<Recipe> {
    return await this.recipesService.findById(id)
  }

  @Delete('/:id')
  @ApiOperation({ title: 'Delete recipe by ID' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.recipesService.delete(id)
  }
}
