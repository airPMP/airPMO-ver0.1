import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, CategoriesDocument } from 'src/schemas/categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories.name) private categoriesModel: Model<CategoriesDocument>){}
 async create(createCategoryDto: CreateCategoryDto) {
    return await this. categoriesModel.create(createCategoryDto)
  }

 async findAll() {
    return await this. categoriesModel.find()
  }

 async findOne(id: string) {
    return await this.categoriesModel.findById({_id:id})
  }

 async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return  await this.categoriesModel.updateOne({"_id":id},{"name":updateCategoryDto.name,"type":updateCategoryDto.type," discription":updateCategoryDto.discription, "categories_id":updateCategoryDto.categories_id,"orgainization_id":updateCategoryDto.orgainization_id})
   }

  remove(id: string) {
    return this.categoriesModel.deleteOne({"_id":id})
  }
}
