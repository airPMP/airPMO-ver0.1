import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
  import { location, LocationDocument } from 'src/schemas/location.schema';
  import { CreateLocationDto } from './dto/location.dto';
  
  @Injectable()
  export class LocationService {
    constructor(
      @InjectModel(location.name) private LocationModel:SoftDeleteModel<LocationDocument>,
    ) {}
  
    async create(createLocationDto: CreateLocationDto) {
        
        const location = await this.LocationModel.findOne({
            location_name: createLocationDto.location_name,
        });

        if (!location) {
          const create = new this.LocationModel(createLocationDto);
          return await create.save();
        }
    }
  
    async findAll() {
      return await this.LocationModel.find();
    }

}