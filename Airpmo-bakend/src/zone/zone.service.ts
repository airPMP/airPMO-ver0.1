import {
  Injectable,
  NotFoundException,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { zone, zoneDocument } from 'src/schemas/zone.schema';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Base64, encode } from 'js-base64';
@Injectable()
export class ZoneService {
  constructor(@InjectModel(zone.name) private zoneModel: Model<zoneDocument>) {}
  async create(createZoneDto: CreateZoneDto) {
    try {
      return await this.zoneModel.create(createZoneDto);
    } catch {
      throw new NotFoundException('zone not exist ');
    }
  }

  async findAll(req) {
    const new_arr = [];
    const payload = req.headers.authorization.split('.')[1];
    const encodetoken = Base64.decode(payload);
    var obj = JSON.parse(encodetoken);
    var organizationkey = obj.organization_id;
    const findzone = await this.zoneModel.find();
    for (let index = 0; index < findzone.length; index++) {
      if (findzone[index].organization_id === organizationkey) {
        new_arr.push(findzone[index]);
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
      const zone = await this.zoneModel.findOne({ _id: id });
      if (zone.organization_id === organizationkey) {
        return zone;
      } else {
        throw new UnprocessableEntityException(
          'its not exist in this orgainization',
        );
      }
    } catch {
      throw new NotFoundException('Zone is not exist');
    }
  }

  async update(id: string, updateZoneDto: UpdateZoneDto) {
    try {
      const updatedzone = await this.zoneModel.updateMany(
        { _id: id },
        { ...updateZoneDto },
      );
      return updatedzone;
    } catch {
      throw new NotFoundException('zone is not exist');
    }
  }

  async remove(id: string) {
    try {
      const deletezone = await this.zoneModel.remove({ _id: id });
      return {
        massage: 'deleted sucessfully',
      };
    } catch {
      throw new NotFoundException('zone is not exist');
    }
  }

  async findorganization(organization_id: string) {
    try {
      const organizationdata = await this.zoneModel.find({
        organization_id: organization_id,
      });
      return organizationdata;
    } catch {
      throw new UnprocessableEntityException('zone not found');
    }
  }

  async findproject(project_id: string, @Req() req) {
    const new_arr = [];
    const payload = req.headers.authorization.split('.')[1];
    const encodetoken = Base64.decode(payload);
    var obj = JSON.parse(encodetoken);
    var organizationkey = obj.organization_id;
    const projectdata = await this.zoneModel.find({ project_id: project_id });
    for (let index = 0; index < projectdata.length; index++) {
      if (projectdata[index].organization_id === organizationkey) {
        new_arr.push(projectdata[index]);
      }
    }
    return new_arr;
  }
}
