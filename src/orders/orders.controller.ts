import {
  Body,
  Controller,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Foundations } from './dto/foundation.dto';
import { Platform } from './dto/platform.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Post('platforms')
  async addOrderPlatform(
    @Res() res,
    @Body(new ValidationPipe({ transform: true })) body: Platform,
  ) {
    return this.orderService.addOrderPlatform(res, body);
  }
  @Post('foundations')
  async addOrderFoundations(
    @Res() res,
    @Body(new ValidationPipe({ transform: true })) body: Foundations,
  ) {
    return this.orderService.addOrderFoundations(res, body);
  }
}
