import { Body, Controller, Get, Res, ValidationPipe } from '@nestjs/common';
import { Foundations } from './dto/foundation.dto';
import { FoundationsService } from './foundations.service';

@Controller('foundations')
export class FoundationsController {
  constructor(private foundationService: FoundationsService) {}
  @Get()
  async getFoundations(
    @Res() res,
    @Body(new ValidationPipe({ transform: true })) body: Foundations,
  ) {
    return this.foundationService.getFoundations(res, body);
  }
}
