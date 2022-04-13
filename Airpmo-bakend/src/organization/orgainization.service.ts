import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  orgainization,
  orgainizationDocument,
} from 'src/schemas/organization.schema';
import { CreateOrgainizationDto } from './dto/create-orgainization.dto';
import { UpdateOrgainizationDto } from './dto/update-orgainization.dto';

@Injectable()
export class OrgainizationService {
  constructor(
    @InjectModel(orgainization.name)
    private orgainizationmodel: SoftDeleteModel<orgainizationDocument>,
  ) {}

  async create(createOrgainizationDto: CreateOrgainizationDto) {
    const find_organization = await this.orgainizationmodel.findOne({
      user_id: createOrgainizationDto.user_id,
    });
    if (find_organization === null) {
      return this.orgainizationmodel.create(createOrgainizationDto);
    } else {
      throw new NotFoundException('organization already exist');
    }
  }

  findAll() {
    return this.orgainizationmodel.find();
  }

  async findOne(id: string) {
    try {
      const orgainizationf = await this.orgainizationmodel.findById({
        _id: id,
      });
      return orgainizationf;
    } catch {
      throw new NotFoundException('oraganization is not exist');
    }
  }

  async update(id: string, updateOrgainizationDto: UpdateOrgainizationDto) {
    try {
      const orgainizationu = await this.orgainizationmodel.updateMany(
        { _id: id },
        { ...updateOrgainizationDto },
      );
      return {
        massage: 'oraganization updated',
      };
    } catch {
      throw new NotFoundException('oraganization is not exist');
    }
  }
  async remove(id: string) {
    try {
      const orgainizationd = await this.orgainizationmodel.softDelete({
        _id: id,
      });
      return {
        massage: 'orgainization Deleted',
      };
    } catch {
      throw new NotFoundException('oraganization is not exist');
    }
  }

  async finduser(user_id: string) {
    const finduser = await this.orgainizationmodel.find({ user_id: user_id });
    return finduser;
  }
}
