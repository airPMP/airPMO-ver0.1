import { Controller, Get, Post, Body, Patch, Param, Delete,Req} from '@nestjs/common';
import { CreateLocationDto } from './dto/location.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';
import { LocationService } from './location.service';

@ApiTags("Location Api")
@Controller('api')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Auth('CREATE-LOCATION')
  @Post("location")
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Auth('GET-LOCATION')
  @Get("location")
  findAll(@Req()req) {
    return this.locationService.findAll();
  }
}
