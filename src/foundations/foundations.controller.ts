import { Controller, Get, Query, Res } from '@nestjs/common';
import { OrderIdDto } from '../common/dot/orderId.dto';
import { FoundationsService } from './foundations.service';

@Controller('foundations')
export class FoundationsController {
  constructor(private foundationService: FoundationsService) {}
  @Get()
  async getFoundations(@Res() res, @Query() orderIdDto: OrderIdDto) {
    return this.foundationService.getFoundations(res, orderIdDto.orderId);
  }
}
