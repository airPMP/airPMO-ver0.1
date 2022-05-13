import {
  Injectable,
  NotFoundException,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { project, projectDocument } from 'src/schemas/projects.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Base64, encode } from 'js-base64';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(project.name) private projectModel:SoftDeleteModel<projectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.projectModel.create(createProjectDto);
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
    const all_project = await this.projectModel.find();
     if(all_project.length!=0){
    for (let index = 0; index < all_project.length; index++) {
      if (all_project[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        new_arr.push(all_project[index]);
      }
    }
    return new_arr;
  }
  else{
    return new NotFoundException('unable to find project data')
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
      const find_project = await this.projectModel.findOne({ _id: id });
      if(find_project!=null){

      if (find_project.organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        return find_project;
      } else {
        throw new UnprocessableEntityException(
          'its not exist in this orgainization',
        );
      }

    }else{
      return new NotFoundException('unable to find project data')
    }
    } catch {
      throw new NotFoundException('project not exist');
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      const project_data=await this.projectModel.findOne({_id:id})
       if(project_data!=null){
      const user = await this.projectModel.updateOne(
        { _id: id },
        { ...updateProjectDto },
      );
      return {
        massage: 'update sucessfully',
      }
    }else{ 
      return new NotFoundException('unable to find project data');
    };
    } catch {
      throw new NotFoundException('project not exist');
    }
  }
  async remove(id: string) {
    try {
      const project_data=await this.projectModel.findOne({_id:id})
      if(project_data!=null){
      const user = await this.projectModel.softDelete({ _id: id });
      return {
        massage: 'Delete sucessfully',
      }
    }else{
      return new NotFoundException('unable to find project data');
    };
    } catch {
      throw new NotFoundException('project not exist');
    }
  }

  async findorganization(organization_id: string) {
    try {
      const projectorganization = await this.projectModel.find({
        orgainization_id: organization_id,
      });
      return projectorganization;
    } catch {
      throw new NotFoundException(
        'these organization project is not available',
      );
    }
  }

  async findcatagories(catagories_id: string, @Req() req) {
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
      const catagoriesdata = await this.projectModel.find({
        categories_id: catagories_id,
      });
      if(catagoriesdata.length!=0){
      for (let index = 0; index < catagoriesdata.length; index++) {
        if (catagoriesdata[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
          new_arr.push(catagoriesdata[index]);
        }
      }
      return new_arr;
    }else{
      return new NotFoundException('unable to find project data');
    }
    } catch {
      throw new NotFoundException('project not found');
    }
  }

  async findclient(client_id: string, @Req() req) {
    const new_arr = [];
    const payload = req.headers.authorization.split('.')[1];
    const encodetoken = Base64.decode(payload);
    var obj = JSON.parse(encodetoken);
    var organizationkey = obj.organization_id;
    var airmpo_designation = obj.roles[0];
    if (organizationkey === undefined || organizationkey === null) {
      throw new UnprocessableEntityException('organization not found');
    }
    const projectdata = await this.projectModel.find({ client_id: client_id });
    if(projectdata.length!=0){
    for (let index = 0; index < projectdata.length; index++) {
      if (projectdata[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        new_arr.push(projectdata[index]);
      }
    }
    return new_arr;
  }else{
    return new NotFoundException('unable to find project data')
  }
  }
  
}
