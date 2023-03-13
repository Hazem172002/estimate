import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FunctionalitiesService {
  constructor(
    private responseService: ResponseService,
    private prisma: PrismaService,
  ) {}
  async getFunctionalities(res) {
    const functionalities=await this.prisma.functionalities.findMany()
  }
}
