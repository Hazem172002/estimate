import { Module } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from '../prisma.service';
import { PlatformsController } from './platforms.controller';
import { PlatformsService } from './platforms.service';

@Module({
  controllers: [PlatformsController],
  providers: [PlatformsService, ResponseService, PrismaService],
  exports: [PlatformsService],
})
export class PlatformsModule {}
