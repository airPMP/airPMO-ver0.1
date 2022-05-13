import {
  Injectable,
  NotFoundException,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, CategoriesDocument } from 'src/schemas/categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Base64 } from 'js-base64';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { ApiNotFoundResponse } from '@nestjs/swagger';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private categoriesModel: SoftDeleteModel<CategoriesDocument>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesModel.create(createCategoryDto);
  }

  async findAll(@Req() req) {
    try {
      const new_arr = [];
      const payload = req.headers.authorization.split('.')[1];
      const encodetoken = Base64.decode(payload);
      var obj = JSON.parse(encodetoken);
      var organizationkey = obj.organization_id;
      var airmpo_designation = obj.roles[0];
      if (organizationkey === undefined || organizationkey === null) {
        throw new UnprocessableEntityException('organization not found');
      }
      const find_catagories = await this.categoriesModel.find();
      if (find_catagories.length != 0) {
        for (let i = 0; i < find_catagories.length; i++) {
          if (
            find_catagories[i].organization_id === organizationkey ||
            airmpo_designation === 'Airpmo Super Admin'
          ) {
            new_arr.push(find_catagories[i]);
          }
        }
        return new_arr;
      } else {
        return new NotFoundException('catagories !data not found');
      }
    } catch {
      throw new UnprocessableEntityException('catagoires not exist');
    }
  }

  async findOne(id: string, @Req() req) {
    try {
      const new_arr = [];
      const payload = req.headers.authorization.split('.')[1];
      const encodetoken = Base64.decode(payload);
      var obj = JSON.parse(encodetoken);
      var organizationkey = obj.organization_id;
      var airmpo_designation = obj.roles[0];
      const user = await this.categoriesModel.findById({ _id: id });
      if (user != null) {
        if (
          user.organization_id === organizationkey ||
          airmpo_designation === 'Airpmo Super Admin'
        ) {
          return user;
        } else {
          throw new UnprocessableEntityException(
            'these user not exist in this orgainization',
          );
        }
      } else {
        return new NotFoundException('categories data not found');
      }
    } catch {
      throw new NotFoundException('categories not exist');
    }
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const catagoires_data = await this.categoriesModel.findOne({ _id: id });
      if (catagoires_data) {
        const user = await this.categoriesModel.updateOne(
          { _id: id },
          {
            category: updateCategoryDto.category,
            sub_category: updateCategoryDto.sub_category,
            discription: updateCategoryDto.discription,
            orgainization_id: updateCategoryDto.organization_id,
          },
        );
        return {
          massage: 'categories Updated',
        };
      } else {
        return new NotFoundException('categories not exist');
      }
    } catch {
      throw new NotFoundException('categories not exist');
    }
  }

  async remove(id: string) {
    try {
      const catagoires_data = await this.categoriesModel.findOne({ _id: id });
      if (catagoires_data) {
      const user = await this.categoriesModel.softDelete({ _id: id });
      return {
        massage: 'categories Deleted',
      }
    }else{
      return new NotFoundException('categories not exist')
    };
    } catch {
      throw new NotFoundException('categories not exist');
    }
  }

  async findorganization(organization_id: string) {
    const findorgaize = await this.categoriesModel.find({
      orgainization_id: organization_id,
    });
    return findorgaize;
  }
}
