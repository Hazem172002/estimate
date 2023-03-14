import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlatformsService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
  ) {}
  async getPlatformsIdsHoursInOrder(orderId: string) {
    const platformIdsHourPrice = {};
    const platforms = await this.prisma.orders.findFirst({
      where: {
        id: orderId,
      },
      select: {
        PlatformOrders: {
          select: {
            Platform: {
              select: {
                id: true,
                name: true,
                subtitle: true,
                hourPrice: true,
              },
            },
          },
        },
      },
    });

    platforms.PlatformOrders.forEach(
      (p) => (platformIdsHourPrice[p.Platform.id] = p.Platform.hourPrice),
    );

    return platformIdsHourPrice;
  }
  async getPlatforms(res) {
    const platforms = await this.prisma.platforms.findMany();
    return this.responseService.success(res, 'platforms', platforms);
  }
}
