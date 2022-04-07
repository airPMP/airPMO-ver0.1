import {
  Injectable,
  NotFoundException,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  subdividedzone,
  subdividedzoneDocument,
} from 'src/schemas/subdividedzone.schema';
import { CreateSubdividedzoneDto } from './dto/create-subdividedzone.dto';
import { UpdateSubdividedzoneDto } from './dto/update-subdividedzone.dto';
import { Base64, encode } from 'js-base64';

@Injectable()
export class SubdividedzoneService {
  constructor(
    @InjectModel(subdividedzone.name)
    private subdividedzonemodel: Model<subdividedzoneDocument>,
  ) {}
  async create(createSubdividedzoneDto: CreateSubdividedzoneDto) {
    return await this.subdividedzonemodel.create(createSubdividedzoneDto);
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
      const all_sub_divided_zone = await this.subdividedzonemodel.find();
      for (let index = 0; index < all_sub_divided_zone.length; index++) {
        if (all_sub_divided_zone[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
          new_arr.push(all_sub_divided_zone[index]);
        }
      }
      return new_arr;
    } catch {
      throw new NotFoundException(' sub_divided_zone not found');
    }
  }

  async findOne(id: string, @Req() req) {
    try {
      const payload = req.headers.authorization.split('.')[1];
      const encodetoken = Base64.decode(payload);
      var obj = JSON.parse(encodetoken);
      var organizationkey = obj.organization_id;
      var airmpo_designation = obj.roles[0];
      if (organizationkey === undefined || organizationkey === null) {
        throw new UnprocessableEntityException('organization not found');
      }
      const subdividedzon = await this.subdividedzonemodel.findOne({ _id: id });
      if (subdividedzon.organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        return subdividedzon;
      } else {
        throw new UnprocessableEntityException(
          'its not exist in this orgainization',
        );
      }
    } catch {
      throw new NotFoundException('sub divided zone is not exist');
    }
  }

  async update(id: string, updateSubdividedzoneDto: UpdateSubdividedzoneDto) {
    try {
      const updatesubdividedzone = await this.subdividedzonemodel.updateMany(
        { _id: id },
        { ...updateSubdividedzoneDto },
      );
      return updatesubdividedzone;
    } catch {
      throw new NotFoundException('sub divided zone is not exist');
    }
  }

  async remove(id: string) {
    return this.subdividedzonemodel.deleteOne({ _id: id });
  }

  async findsubdivided(subzone_id: string, @Req() req) {
    const new_arr = [];
    const payload = req.headers.authorization.split('.')[1];
    const encodetoken = Base64.decode(payload);
    var obj = JSON.parse(encodetoken);
    var organizationkey = obj.organization_id;
    var airmpo_designation = obj.roles[0];
    if (organizationkey === undefined || organizationkey === null) {
      throw new UnprocessableEntityException('organization not found');
    }
    const subdividedzone = await this.subdividedzonemodel.find({
      subzone_id: subzone_id,
    });
    for (let index = 0; index <  subdividedzone .length; index++) {
      if (subdividedzone [index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        new_arr.push( subdividedzone [index]);
      }
    }
    return new_arr;
  }

  async findorganization(organization_id: string) {
    const organization = await this.subdividedzonemodel.find({
      organization_id: organization_id,
    });
    return organization;
  }
}
