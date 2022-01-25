import { Module } from '@nestjs/common';
import { SubdividedzoneService } from './subdividedzone.service';
import { SubdividedzoneController } from './subdividedzone.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { subdividedzone, subdividedzoneSchema } from 'src/schemas/subdividedzone.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name:subdividedzone.name,schema:subdividedzoneSchema }])],
  controllers: [SubdividedzoneController],
  providers: [SubdividedzoneService]
})
export class SubdividedzoneModule {}
