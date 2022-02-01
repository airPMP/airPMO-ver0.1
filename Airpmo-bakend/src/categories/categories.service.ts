import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, CategoriesDocument } from 'src/schemas/categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories.name) private categoriesModel: Model<CategoriesDocument>) { }
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesModel.create(createCategoryDto)
  }

  async findAll() {
    return await this.categoriesModel.find()
  }

  async findOne(id: string) {
    try {
      const user = await this.categoriesModel.findById({ _id: id })
      return user
    } catch {
      throw new NotFoundException("categories not exist")
    }
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const user = await this.categoriesModel.updateOne({ "_id": id }, { "category": updateCategoryDto.category, "sub_category": updateCategoryDto.sub_category, "discription": updateCategoryDto.discription,  "orgainization_id": updateCategoryDto.orgainization_id })
      return {
        "massage": "categories Updated"
      }
    } catch {
      throw new NotFoundException("categories not exist")
    }
  }

  async remove(id: string) {
    try {
      const user = await this.categoriesModel.deleteOne({ "_id": id })
      return {
        "massage": "categories Deleted"
      }
    } catch {
      throw new NotFoundException("categories not exist")
    }
  }

async  findorganization(organization_id:string){
  const findorgaize = await this.categoriesModel.find({"orgainization_id":organization_id})
  return findorgaize
}


}
