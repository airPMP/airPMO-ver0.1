import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
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

  @Auth('GET-JOB-CARD')
  @Get('find_job_card/:id')
  async findjobCard(@Param('id') id: string, @Req() req) {
    return await this.jobCardsService.findjobCard(id, req);
  }

  @Auth('GET-JOB-CARD')
  @Get('find_all_job_card')
  async findJob(@Req() req) {
    return await this.jobCardsService.findjob(req);
  }

  @Auth('GET-JOB-CARD')
  @Get('find_job_card_by_project/:id')
  async getjobcardbyprojectid(@Param('id') id: string, @Req() req) {
    return await this.jobCardsService.jobcardbyprojectid(id, req);
  }

  @Auth('DELETE-JOB-CARD')
  @Delete('delete_job_card/:id')
  async deleteJobcard(@Param('id') id: string) {
    return await this.jobCardsService.deleteJobcard(id);
  }

  @Auth('EDIT-JOB-CARD')
  @Patch('update_job_card')
  async editjobcard(
    // @Param('id') id: string,
    @Body() UpdateJobCardDto: UpdateJobCardDto[],
  ) {
    return await this.jobCardsService.updatejobcard(UpdateJobCardDto);
  }

  @Auth('EDIT-JOB-CARD')
  @Patch('update_job_card/:id/:project_id')
  async editjobcardbyid(
    @Param('id') id: string,
    @Param('project_id') project_id: string,
    @Body() UpdateJobCardDto: UpdateJobCardDto,
  ) {
    return await this.jobCardsService.editjobcardbyid(id,project_id,UpdateJobCardDto);
  }

  @Auth('GET-JOB-CARD')
  @Get('find_all_assign_card_by_user/:id/:project_id')
  async getmyjobcardbyuserid(
    @Param('id') id: string,
    @Param('project_id') project_id: string,
    @Req() req,
  ) {
    return await this.jobCardsService.getmyjobcardbyuserid(id, project_id, req);
  }

  @Auth('EDIT-JOB-CARD')
  @Patch('update_job_card/:id')
  async editspicpi(
    @Param('id') id: string,
    @Body() UpdateJobCardDto: UpdateJobCardDto,
  ) {
    return await this.jobCardsService.editspicpi(id,UpdateJobCardDto);
  }


  @Get('get_job_cards_by_project/:project_id')
  async findjobprojectid(@Param('project_id') project_id: string) {
    return await this.jobCardsService.findjobprojectid(project_id);
  }


  // @Auth('CREATE-ASSIGN-JOB-CARD')
  // @Post('assign_job_card')
  // async assignjobcard(@Body() assignJobCardDto: assignJobCardDto) {
  //   return await this.jobCardsService.assignjobcard(assignJobCardDto);
  // }

  // @Auth('GET-ASSIGN-JOB-CARD')
  // @Get('find_assign_job_card/:id')
  // async findassigncard(@Param('id') id: string, @Req() req) {
  //   return await this.jobCardsService.getassignjobcard(id, req);
  // }

  // @Auth('GET-ASSIGN-JOB-CARD')
  // @Get('assign_user_data/:id')
  // async assignuserdata(@Param('id') id: string, @Req() req) {
  //   return await this.jobCardsService.assignuserdata(id, req);
  // }

  // @Auth('GET-ASSIGN-JOB-CARD')
  // @Get('find_all_assign_job_card')
  // async findallassigncard(@Req() req) {
  //   return await this.jobCardsService.findallassigncard(req);
  // }

  // @Auth('GET-ASSIGN-JOB-CARD')
  // @Get('find_assign_job_card_by_project/:id')
  // async getassignjobcardbyprojectid(@Param('id') id: string, @Req() req) {
  //   return await this.jobCardsService.assignjobcardbyprojectid(id, req);
  // }

  // @Auth('GET-MY-JOB-CARD')
  // @Get('find_my_all_assign_card_by_user/:id/:project_id')
  // async getmyjobcardbyuserid(
  //   @Param('id') id: string,
  //   @Param('project_id') project_id: string,
  //   @Req() req,
  // ) {
  //   return await this.jobCardsService.getmyjobcardbyuserid(id,project_id, req);
  // }

  // @Auth('CREATE-MY-JOB-CARD')
  // @Post('create_my_job_card')
  // async myjobcard(@Body() createmyjobcardDto: createmyjobcardDto) {
  //   return await this.jobCardsService.createmyjobcard(createmyjobcardDto);
  // }

  // @Auth('GET-MY-JOB-CARD')
  // @Get('find_my_job_card/:id')
  // async findmyjobcardByid(@Param('id') id: string, @Req() req) {
  //   return await this.jobCardsService.findmyjobcard(id, req);
  // }

  // @Auth('GET-MY-JOB-CARD')
  // @Get('find_my_job_card_all')
  // async findmyjobcard(@Req() req) {
  //   return await this.jobCardsService.myjobcard(req);
  // }

  // @Auth('GET-MY-JOB-CARD')
  // @Get('find_my_job_card_by_project/:id')
  // async getmyjobcardbyprojectid(@Param('id') id: string, @Req() req) {
  //   return await this.jobCardsService.myjobcardbyprojectid(id, req);
  // }
}
