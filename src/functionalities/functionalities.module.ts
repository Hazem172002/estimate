import { Module } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';
import { PlatformsModule } from '../platforms/platforms.module';
import { FunctionalitiesController } from './functionalities.controller';
import { FunctionalitiesService } from './functionalities.service';

@Module({
  providers: [FunctionalitiesService, ResponseService, PrismaService],
  controllers: [FunctionalitiesController],
  imports: [PlatformsModule],
})
export class FunctionalitiesModule {}
