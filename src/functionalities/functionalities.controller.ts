import { Body, Controller, Get, Res } from '@nestjs/common';
import { Functionality } from './dto/functionality.dto';
import { FunctionalitiesService } from './functionalities.service';

@Controller('functionalities')
export class FunctionalitiesController {
  constructor(private functionalitiesService: FunctionalitiesService) {}
  @Get()
  async getFunctionalities(@Res() res, @Body('orderId') orderId: string) {
    return this.functionalitiesService.getFunctionalities(res, orderId);
  }
}
