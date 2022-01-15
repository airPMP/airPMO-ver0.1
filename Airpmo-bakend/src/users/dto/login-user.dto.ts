import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class loginusersDto {
    @IsString()
    // @MinLength(4)
    // @MaxLength(20)
    @IsNotEmpty()
    @ApiProperty()
    Email: string;
  
    @IsString()
    @MinLength(4, { message: 'Password is too short (4 characters min)' })
    @MaxLength(20, { message: 'Password is too long (20 characters max)' })
    @IsNotEmpty()
    @ApiProperty()
    Password: string;
    static Password: string | Buffer;
  }