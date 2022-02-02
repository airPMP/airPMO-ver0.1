const dotenv =require('dotenv') 
dotenv.config()
import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { users, usersSchema } from "src/schemas/users.schema";
import { UsersSeeder } from "./user.seeder";
import { UserRole, UserRoleSchema } from "src/schemas/user_roles.schema";
import { Role, RoleSchema } from "src/schemas/roles.schema";
import { RolesSeeder } from "./role.seeder";
import { PermissionsSeeder } from "./permission.seeder";
import { Permission, PermissionSchema } from "src/schemas/permission.schema";

 
seeder({
    imports: [  MongooseModule.forRoot('mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT, {
        user:process.env.DB_USERNAME,
        pass:process.env.DB_PASSWORD,
        dbName:process.env.DATABASE,
        w: 'majority',
        retryWrites: true
      }),MongooseModule.forFeature([{ name: users.name, schema: usersSchema },{ name:Role.name,schema:RoleSchema },{ name:UserRole.name,schema:UserRoleSchema },{ name:Permission.name,schema:PermissionSchema}])],

}).run([UsersSeeder,RolesSeeder,PermissionsSeeder]);