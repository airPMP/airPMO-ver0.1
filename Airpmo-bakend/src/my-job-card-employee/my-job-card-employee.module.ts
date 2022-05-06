import { Module } from '@nestjs/common';
import { MyJobCardEmployeeService } from './my-job-card-employee.service';
import { MyJobCardEmployeeController } from './my-job-card-employee.controller';
import {
  myjobcardemployee,
  myjobcardemployeeschema,
} from 'src/schemas/my-job-card-employee.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: myjobcardemployee.name, schema: myjobcardemployeeschema },
    ]),
  ],
  controllers: [MyJobCardEmployeeController],
  providers: [MyJobCardEmployeeService],
  exports: [MyJobCardEmployeeService]
})
export class MyJobCardEmployeeModule {}
