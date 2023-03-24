import { Controller, Get, Query, Res } from '@nestjs/common';
import { OrderIdDto } from '../common/dot/orderId.dto';
import { FunctionalitiesService } from './functionalities.service';

@Controller('functionalities')
export class FunctionalitiesController {
  constructor(private functionalitiesService: FunctionalitiesService) {}
  @Get()
  async getFunctionalities(@Res() res, @Query() orderIdDto: OrderIdDto) {
    return this.functionalitiesService.getFunctionalities(
      res,
      orderIdDto.orderId,
    );
  }
}
