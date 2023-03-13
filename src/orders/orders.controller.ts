import {
  Body,
  Controller,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Platform } from './dto/platform.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Post('addPlatforms')
  async addOrderPlatform(
    @Res() res,
    @Body(new ValidationPipe({ transform: true })) body: Platform,
  ) {
    return this.orderService.addOrderPlatform(res, body);
  }
}
