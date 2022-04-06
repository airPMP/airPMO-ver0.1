import {
  Injectable,
  NotFoundException,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { subzone, subzoneDocument } from 'src/schemas/subzone.schema';
import { CreateSubzoneDto } from './dto/create-subzone.dto';
import { UpdateSubzoneDto } from './dto/update-subzone.dto';
import { Base64, encode } from 'js-base64';

@Injectable()
export class SubzoneService {
  constructor(
    @InjectModel(subzone.name) private subzoneModel: Model<subzoneDocument>,
  ) {}
  async create(createSubzoneDto: CreateSubzoneDto) {
    return await this.subzoneModel.create(createSubzoneDto);
  }

  async findAll(@Req() req) {
    const new_arr = [];
    const payload = req.headers.authorization.split('.')[1];
    const encodetoken = Base64.decode(payload);
    var obj = JSON.parse(encodetoken);
    var organizationkey = obj.organization_id;
    var airmpo_designation = obj.roles[0];
    if (organizationkey === undefined || organizationkey === null) {
      throw new UnprocessableEntityException('organization not found');
    }
    const find_all_subzone = await this.subzoneModel.find();
    for (let index = 0; index < find_all_subzone.length; index++) {
      if (find_all_subzone[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        new_arr.push(find_all_subzone[index]);
      }
    }
    return new_arr;
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
      const subzone = await this.subzoneModel.findOne({ _id: id });
      if (subzone.organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        return subzone;
      } else {
        throw new UnprocessableEntityException(
          'its not exist in this orgainization',
        );
      }
    } catch {
      throw new NotFoundException('subzone is not exist');
    }
  }

  async update(id: string, updateSubzoneDto: UpdateSubzoneDto) {
    try {
      const subzoneupdated = await this.subzoneModel.updateMany(
        { _id: id },
        { ...updateSubzoneDto },
      );
      return subzoneupdated;
    } catch {
      throw new NotFoundException('subzone is not exist');
    }
  }

  async remove(id: string) {
    try {
      const deletezone = await this.subzoneModel.deleteOne({ _id: id });
      return deletezone;
    } catch {
      throw new NotFoundException('subzone is not exist');
    }
  }

  async findsubzone(zone_id: string, @Req() req) {
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
      const find_sub_zone = await this.subzoneModel.find({ zone_id: zone_id });
      for (let index = 0; index < find_sub_zone.length; index++) {
        if (find_sub_zone[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
          new_arr.push(find_sub_zone[index]);
        }
      }
      return new_arr;
    } catch {
      throw new NotFoundException('these zone id subzone not exist');
    }
  }

  async findorganization(organization_id: string) {
    const organization = await this.subzoneModel.find({
      organization_id: organization_id,
    });
    return organization;
  }
}
