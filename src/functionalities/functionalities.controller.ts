import { Controller, Get, Res } from '@nestjs/common';
import { FunctionalitiesService } from './functionalities.service';

@Controller('functionalities')
export class FunctionalitiesController {
  constructor(private functionalitiesService: FunctionalitiesService) {}
  @Get()
  async getFunctionalities(@Res() res) {
    return this.functionalitiesService.getFunctionalities(res);
  }
}
