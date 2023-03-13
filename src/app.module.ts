/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaService } from './prisma.service';
import { PlatformsService } from './platforms/platforms.service';
import { PlatformsController } from './platforms/platforms.controller';
import { PlatformsModule } from './platforms/platforms.module';
import { ResponseService } from './helper/service/response.service';
import { FoundationsController } from './foundations/foundations.controller';
import { FoundationsService } from './foundations/foundations.service';
import { FoundationsModule } from './foundations/foundations.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { FunctionalitiesController } from './functionalities/functionalities.controller';
import { FunctionalitiesModule } from './functionalities/functionalities.module';
import { FunctionalitiesService } from './functionalities/functionalities.service';

@Module({
  imports: [
    PlatformsModule,
    FoundationsModule,
    OrdersModule,
    FunctionalitiesModule,
  ],
  controllers: [
    AppController,
    PlatformsController,
    FoundationsController,
    OrdersController,
    FunctionalitiesController,
  ],
  providers: [
    AppService,
    PrismaService,
    PlatformsService,
    ResponseService,
    FoundationsService,
    OrdersService,
    FunctionalitiesService,
  ],
})
export class AppModule {}
