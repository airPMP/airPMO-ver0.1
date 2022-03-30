import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobCardsService } from './job-cards.service';
import { UpdateJobCardDto } from './dto/update-job-card.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateJobCardDto } from './dto/create-job-card.dto';
import { assignJobCardDto } from './dto/assign-job-card.dto';
import { Auth } from 'src/decorator/auth.decorator';
import { createmyjobcardDto } from './dto/my-job-card-dto';

@ApiTags('JOB CARDS')
@Controller('/api')
export class JobCardsController {
  constructor(private readonly jobCardsService: JobCardsService) {}

  @Auth('CREATE-JOB-CARD')
  @Post('create_job_card')
  async createjobCard(@Body() CreateJobCardDto: CreateJobCardDto) {
    return await this.jobCardsService.createjobCard(CreateJobCardDto);
  }

  @Auth('FIND-JOB-CARD')
  @Get('find_job_card/:id')
  async findjobCard(@Param('id') id: string) {
    return await this.jobCardsService.findjobCard(id);
  }

  @Auth('FIND-ALL-JOB-CARD')
  @Get('find_all_job_card')
  async findJob() {
    return await this.jobCardsService.findjob();
  }

  @Auth('DELETE-JOB-CARD')
  @Delete('delete_job_card/:id')
  async deleteJobcard(@Param('id') id: string) {
    return await this.jobCardsService.deleteJobcard(id);
  }

  @Auth('UPDATE-JOB-CARD')
  @Patch('update_job_card/:id')
  async editjobcard(
    @Param('id') id: string,
    @Body() UpdateJobCardDto: UpdateJobCardDto,
  ) {
    return await this.jobCardsService.updatejobcard(id, UpdateJobCardDto);
  }

  @Auth('ASSIGN-JOB-CARD')
  @Post('assign_job_card')
  async assignjobcard(@Body() assignJobCardDto: assignJobCardDto) {
    return await this.jobCardsService.assignjobcard(assignJobCardDto);
  }

  @Auth('FIND-ASSIGN-JOB-CARD')
  @Get('find_assign_job_card/:id')
  async findassigncard(@Param('id') id: string) {
    return await this.jobCardsService.getassignjobcard(id);
  }

  @Auth('FIND-ALL_ASSIGN_USER_BY_ID')
  @Get('assign_user_data/:id')
  async assignuserdata(@Param('id') id: string) {
    return await this.jobCardsService.assignuserdata(id);
  }

  @Auth('FIND-ALL-JOB-CARD')
  @Get('find_all_assign_job_card')
  async findallassigncard() {
    return await this.jobCardsService.findallassigncard();
  }

  @Auth('CREATE_MY_JOB_CARD')
  @Post('create_my_job_card')
  async myjobcard(@Body() createmyjobcardDto: createmyjobcardDto) {
    return await this.jobCardsService.createmyjobcard(createmyjobcardDto);
  }

  @Auth('FIND_MY_JOB_CARD')
  @Get('find_my_job_card/:id')
  async findmyjobcardByid(@Param('id') id: string) {
    return await this.jobCardsService.findmyjobcard(id);
  }

  @Auth('FIND_MY_JOB_CARD_ALL')
  @Get('find_my_job_card_all')
  async findmyjobcard() {
    return await this.jobCardsService.myjobcard();
  }
}
