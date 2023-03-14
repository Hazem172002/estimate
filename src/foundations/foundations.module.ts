import { Module } from '@nestjs/common';
import { ResponseService } from '../helper/service/response.service';
import { PlatformsModule } from '../platforms/platforms.module';
import { PrismaService } from '../prisma.service';
import { FoundationsController } from './foundations.controller';
import { FoundationsService } from './foundations.service';

@Module({
  controllers: [FoundationsController],
  providers: [FoundationsService, ResponseService, PrismaService],
  imports: [PlatformsModule],
})
export class FoundationsModule {}
