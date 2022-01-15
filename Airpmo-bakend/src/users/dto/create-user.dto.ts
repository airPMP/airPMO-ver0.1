import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty,  IsOptional , IsNumber } from 'class-validator';
export class CreateUserDto {


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    FirstName:string;
   
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    LastName:string;
    
    @IsString()
    @ApiProperty()
    Email:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    PhoneNumber:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
  CompanyName:string;

  
    @IsString()
    @IsOptional()
    @ApiProperty()
   Comments:string;

  
   @IsString()
   @IsOptional()
   @ApiProperty()
   Password:string;

}


