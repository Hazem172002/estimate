import { Body, Controller, Get, Res, ValidationPipe } from '@nestjs/common';
import { Functionality } from './dto/functionality.dto';
import { FunctionalitiesService } from './functionalities.service';

@Controller('functionalities')
export class FunctionalitiesController {
  constructor(private functionalitiesService: FunctionalitiesService) {}
  @Get()
  async getFunctionalities(
    @Res() res,
    @Body(new ValidationPipe({ transform: true })) body: Functionality,
  ) {
    return this.functionalitiesService.getFunctionalities(res, body);
  }
}
