import { Module } from '@nestjs/common';
import { PlatformsModule } from './platforms/platforms.module';
import { FoundationsModule } from './foundations/foundations.module';
import { OrdersModule } from './orders/orders.module';
import { FunctionalitiesModule } from './functionalities/functionalities.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    PlatformsModule,
    FoundationsModule,
    OrdersModule,
    FunctionalitiesModule,
  ],
})
export class AppModule {}
