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

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private categoriesModel: Model<CategoriesDocument>,
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
      const find_catagories = await this.categoriesModel.find();
      for (let i = 0; i < find_catagories.length; i++) {
        if (find_catagories[i].organization_id === organizationkey) {
          new_arr.push(find_catagories[i]);
        }
      }
      return new_arr;
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
      const user = await this.categoriesModel.findById({ _id: id });
      if (user.organization_id=== organizationkey) {
        return user;
      } else {
        throw new UnprocessableEntityException(
          'these user not exist in this orgainization',
        );
      }
    } catch {
      throw new NotFoundException('categories not exist');
    }
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
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
    } catch {
      throw new NotFoundException('categories not exist');
    }
  }

  async remove(id: string) {
    try {
      const user = await this.categoriesModel.deleteOne({ _id: id });
      return {
        massage: 'categories Deleted',
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
