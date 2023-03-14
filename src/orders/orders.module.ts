import { Module } from '@nestjs/common';
import { ResponseService } from '../helper/service/response.service';
import { PrismaService } from '../prisma.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ResponseService, PrismaService],
})
export class OrdersModule {}
