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
  async addOrderPlatform(@Res() res, @Body() body: Platform) {
    return this.orderService.addOrderPlatform(res, body);
  }

  @Post('addFoundations')
  async addOrderFoundations(@Res() res, @Body() body: Foundations) {
    return this.orderService.addOrderFoundations(res, body);
  }

  @Post('addFunctionalities')
  async addOrderFunctionalities(@Res() res, @Body() body: Functionalities) {
    return this.orderService.addOrderFunctionalities(res, body);
  }
}
