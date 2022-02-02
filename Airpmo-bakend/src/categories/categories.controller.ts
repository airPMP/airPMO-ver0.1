import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories Api')
@Controller('api')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
 
  @Auth('CREATE-CATEGORIES')
  @Post('categories')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Auth('GET-CATEGORIES')
  @Get('categories')
  findAll() {
    return this.categoriesService.findAll();
  }
   
  @Auth('GET-CATEGORIES')
  @Get('categories/:id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Auth('EDIT-CATEGORIES')
  @Patch('categories/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Auth('DELETE-CATEGORIES')
  @Delete('categories/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }


  @Auth('GET-CATEGORIES')
  @Get('organization/:organization_id/categories')
  findorganization(@Param('organization_id') organization_id: string) {
    return this.categoriesService.findorganization(organization_id);
  }
}
