import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class resetuserdto{
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
  Password:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Confirm_Password:string;



}