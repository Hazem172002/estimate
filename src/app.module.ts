import { Module } from '@nestjs/common';
import { PlatformsModule } from './platforms/platforms.module';
import { FoundationsModule } from './foundations/foundations.module';
import { OrdersModule } from './orders/orders.module';
import { FunctionalitiesModule } from './functionalities/functionalities.module';

@Module({
  imports: [
    PlatformsModule,
    FoundationsModule,
    OrdersModule,
    FunctionalitiesModule,
  ],
})
export class AppModule {}
