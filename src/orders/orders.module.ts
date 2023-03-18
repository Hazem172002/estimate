import { Module } from '@nestjs/common';
import { FoundationsModule } from '../foundations/foundations.module';
import { FunctionalitiesModule } from '../functionalities/functionalities.module';
import { ResponseService } from '../helper/service/response.service';
import { PrismaService } from '../prisma.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ResponseService, PrismaService],
  imports: [FunctionalitiesModule, FoundationsModule],
})
export class OrdersModule {}
