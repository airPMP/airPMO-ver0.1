import { Module } from '@nestjs/common';
import { MyJobCardEquipmentService } from './my-job-card-equipment.service';
import { MyJobCardEquipmentController } from './my-job-card-equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  equipment,
  myjobcardequipmentschema,
} from 'src/schemas/my-job-card-equipment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: equipment.name, schema: myjobcardequipmentschema },
    ]),
  ],
  controllers: [MyJobCardEquipmentController],
  providers: [MyJobCardEquipmentService],
})
export class MyJobCardEquipmentModule {}
