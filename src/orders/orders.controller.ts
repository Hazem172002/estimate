import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { OrderFunctionalities } from './dto/order-functionalities.dto';
import { OrderFoundations } from './dto/order-foundations.dto';
import { OrderPlatform } from './dto/order-platform.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Post('addPlatforms')
  async addOrderPlatform(@Res() res, @Body() body: OrderPlatform) {
    return this.orderService.addOrderPlatform(res, body);
  }

  @Post('addFoundations')
  async addOrderFoundations(@Res() res, @Body() body: OrderFoundations) {
    return this.orderService.addOrderFoundations(res, body);
  }

  @Post('addFunctionalities')
  async addOrderFunctionalities(
    @Res() res,
    @Body() body: OrderFunctionalities,
  ) {
    return this.orderService.addOrderFunctionalities(res, body);
  }
}
