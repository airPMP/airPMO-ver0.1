import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';



@ApiTags('Categories Api')
@Controller('api')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
 
  
  @Post('categories')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('categories')
  findAll() {
    return this.categoriesService.findAll();
  }
   
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('categories/:id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('categories/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('categories/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
