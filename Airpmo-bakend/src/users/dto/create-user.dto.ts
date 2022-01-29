import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty,  IsOptional, IsEmail, IsNumber, MinLength, MaxLength, IsPhoneNumber  } from 'class-validator';

//This is DTO for User Mode
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
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    Email:string;

    @IsNotEmpty()
    @ApiProperty()
    @IsPhoneNumber('IN')
    PhoneNumber:string;

    @ApiProperty()
    CompanyName:string;

    @IsOptional()
    @ApiProperty()
    Comments:string;
 
    @IsString()
    @IsOptional()
    @ApiProperty()
    Password:string;

    @ApiProperty()
    organization_id: string;

    @IsOptional()
    @ApiProperty()
    district:string;
    
    @IsOptional()
    @ApiProperty()
    address:string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    blood_group:string;

    @IsOptional()
    @ApiProperty()
    place:string;

    @IsOptional()
    @ApiProperty()
    @IsPhoneNumber('IN')
    emergency_contact:string;

    @IsOptional()
    @ApiProperty()
    image:string;

    @ApiProperty()
    spread_sheet_user_id: string;

    @ApiProperty()
    is_employee: boolean;

}
