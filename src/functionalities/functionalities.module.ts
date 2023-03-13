import { Module } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';
import { FunctionalitiesService } from './functionalities.service';

@Module({
  providers: [FunctionalitiesService, ResponseService, PrismaService],
})
export class FunctionalitiesModule {}
