import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { location, locationSchema } from 'src/schemas/location.schema';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [MongooseModule.forFeature([{ name:location.name,schema:locationSchema }])],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
