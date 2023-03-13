import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlatformsService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
  ) {}
  async getPlatforms(res) {
    const platforms = await this.prisma.platforms.findMany();
    return this.responseService.success(res, 'platforms', platforms);
  }
}
