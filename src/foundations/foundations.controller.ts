import { Body, Controller, Get, Res } from '@nestjs/common';
import { FoundationsService } from './foundations.service';

@Controller('foundations')
export class FoundationsController {
  constructor(private foundationService: FoundationsService) {}
  @Get()
  async getFoundations(@Res() res, @Body('orderId') orderId: string) {
    return this.foundationService.getFoundations(res, orderId);
  }
}
