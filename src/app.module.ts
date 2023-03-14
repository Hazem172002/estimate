/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaService } from './prisma.service';
import { PlatformsService } from './platforms/platforms.service';
import { PlatformsModule } from './platforms/platforms.module';
import { ResponseService } from './helper/service/response.service';
import { FoundationsService } from './foundations/foundations.service';
import { FoundationsModule } from './foundations/foundations.module';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { FunctionalitiesModule } from './functionalities/functionalities.module';
import { FunctionalitiesService } from './functionalities/functionalities.service';

@Module({
  imports: [
    PlatformsModule,
    FoundationsModule,
    OrdersModule,
    FunctionalitiesModule,
  ],
})
export class AppModule {}
