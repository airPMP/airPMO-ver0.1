import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder} from "nestjs-seeder";
import { Permission, PermissionDocument } from "src/schemas/permission.schema";

 
@Injectable()
export class PermissionsSeeder implements Seeder {
  constructor(@InjectModel(Permission.name) private PermissionModel: Model<PermissionDocument>) {}
 
  async seed(): Promise<any> {

  return  await this.PermissionModel.insertMany([
  {name:"ALL",description:"all endpoint access"},

  {name:"GET-USERS",description:"get user endpoint access"},
  {name:"EDIT-USERS",description:"edit user endpoint access"},
  {name:"DELETE-USERS",description:"remove user endpoint access"},

  {name:"CREATE-ROLES",description:"add roles endpoint access"},
  {name:"EDIT-ROLES",description:"edit roles endpoint access"},
  {name:"GET-ROLES",description:"get roles endpoint access"},
  {name:"DELETE-ROLES",description:"remove roles endpoint access"},

  {name:"CREATE-USER_ROLES",description:"add user role endpoint access"},
  {name:"EDIT-USER_ROLES",description:"edit user role  endpoint access"},
  {name:"GET-USER_ROLES",description:"get user role endpoint access"},
  {name:"DELETE-USER_ROLES",description:"remove user role endpoint access"},

  {name:"CREATE-PERMISSIONS",description:"add permission endpoint access"},
  {name:"EDIT-PERMISSIONS",description:"edit permission endpoint access"},
  {name:"GET-PERMISSIONS",description:"get permission endpoint access"},
  {name:"DELETE-PERMISSIONS",description:"remove permission endpoint access"},

  {name:"CREATE-CATEGORIES",description:"add categories endpoint access"},
  {name:"EDIT-CATEGORIES",description:"edit categories endpoint access"},
  {name:"GET-CATEGORIES",description:"get categories endpoint access"},
  {name:"DELETE-CATEGORIES",description:"remove categories endpoint access"},

  {name:"CREATE-CLIENTS",description:"add clients endpoint access"},
  {name:"EDIT-CLIENTS",description:"edit clients endpoint access"},
  {name:"GET-CLIENTS",description:"get clients endpoint access"},
  {name:"DELETE-CLIENTS",description:"remove clients endpoint access"},

  {name:"CREATE-ORGANIZATION",description:"add organization endpoint access"},
  {name:"EDIT-ORGANIZATION",description:"edit organization endpoint access"},
  {name:"GET-ORGANIZATION",description:"get organization endpoint access"},
  {name:"DELETE-ORGANIZATION",description:"remove organization endpoint access"},  

  {name:"CREATE-PROJECTS",description:"add projects endpoint access"},
  {name:"EDIT-PROJECTS",description:"edit projects endpoint access"},
  {name:"GET-PROJECTS",description:"get projects endpoint access"},
  {name:"DELETE-PROJECTS",description:"remove projects endpoint access"},

  {name:"CREATE-ZONES",description:"add zones endpoint access"},
  {name:"EDIT-ZONES",description:"edit zones endpoint access"},
  {name:"GET-ZONES",description:"get zones endpoint access"},
  {name:"DELETE-ZONES",description:"remove zones endpoint access"},

  {name:"CREATE-SUBZONES",description:"add sub zones endpoint access"},
  {name:"EDIT-SUBZONES",description:"edit sub zones endpoint access"},
  {name:"GET-SUBZONES",description:"get sub zones endpoint access"},
  {name:"DELETE-SUBZONES",description:"remove sub zones endpoint access"},

  {name:"CREATE-SUB_DIVIDED_ZONES",description:"add sub divided zones endpoint access"},
  {name:"EDIT-SUB_DIVIDED_ZONES",description:"edit sub divided zones endpoint access"},
  {name:"GET-SUB_DIVIDED_ZONES",description:"get sub divided zones endpoint access"},
  {name:"DELETE-SUB_DIVIDED_ZONES",description:"remove sub divided zones endpoint access"},
  
  {name:"CREATE/EDIT-PRODUCTIVE_SHEET",description:"add productive sheet"},

  ]
  );
  }
 
  async drop(): Promise<any> {
    return this.PermissionModel.deleteMany({});
  }
}