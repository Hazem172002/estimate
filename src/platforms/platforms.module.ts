import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';
import { PlatformsService } from './platforms.service';

@Module({
  imports: [MulterModule.register({ dest: './uploads' })],

  providers: [PrismaService, PlatformsService, ResponseService],
})
export class PlatformsModule {}
