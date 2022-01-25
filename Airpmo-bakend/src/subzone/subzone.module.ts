import { Module } from '@nestjs/common';
import { SubzoneService } from './subzone.service';
import { SubzoneController } from './subzone.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { subzone, subzoneSchema } from 'src/schemas/subzone.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name:subzone.name,schema:subzoneSchema }])],
  controllers: [SubzoneController],
  providers: [SubzoneService]
})
export class SubzoneModule {}
