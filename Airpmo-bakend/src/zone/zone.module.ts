import { Module } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { zone, zoneSchema } from 'src/schemas/zone.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name:zone.name,schema:zoneSchema }])],
  controllers: [ZoneController],
  providers: [ZoneService]
})
export class ZoneModule {}
