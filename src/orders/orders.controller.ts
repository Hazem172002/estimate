import {
  Body,
  Controller,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Foundations } from '@prisma/client';
import { Functionalities } from './dto/functionalities.dto';
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

  @Post('foundations')
  async addOrderFoundations(
    @Res() res,
    @Body(new ValidationPipe({ transform: true })) body: Foundations,
  ) {
    return this.orderService.addOrderFoundations(res, body);
  }

  @Post('addFunctionalities')
  async addOrderFunctionalities(
    @Res() res,
    @Body(new ValidationPipe({ transform: true })) body: Functionalities,
  ) {
    return this.orderService.addOrderFunctionalities(res, body);
  }
}
