import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
  ) {}

  async addOrderPlatform(res, body) {
    let { platformId } = body;
    if (typeof platformId === 'string') {
      const platform = await this.prisma.platforms.findFirst({
        where: {
          id: platformId,
        },
      });
      if (!platform) {
        return this.responseService.notFound(
          res,
          'this platform is not in my db',
        );
      }

      const addOrder = await this.prisma.orders.create({
        data: {
          cost: platform.hourPrice * platform.hours,
          hours: platform.hours,
          PlatformOrders: {
            create: {
              platformId: platformId,
            },
          },
        },
      });
      return this.responseService.success(
        res,
        'order platform added Successfully',
        { orderId: addOrder.id },
      );
    } else {
      platformId = [...new Set(platformId)];
      let platformCost = 0;
      let platformHours = 0;
      const selectedPlatforms = [];
      const platformsInDb = await this.prisma.platforms.findMany();
      if (platformId.length) {
        platformId.forEach((id) => {
          const platform = platformsInDb.find((p) => p.id === id);
          if (!platform) {
            return this.responseService.badRequest(
              res,
              'validation error',
              'platform is not here',
            );
          }
          selectedPlatforms.push({ platformId: id });
          platformCost += platform.hours * platform.hourPrice;
          platformHours += platform.hours;
        });

        const addOrder = await this.prisma.orders.create({
          data: {
            cost: platformCost,
            hours: platformHours,
            PlatformOrders: {
              createMany: {
                data: selectedPlatforms,
              },
            },
          },
        });
        return this.responseService.success(
          res,
          'order platform added Successfully',
          { orderId: addOrder.id },
        );
      } else {
        return this.responseService.badRequest(
          res,
          'validation error',
          'platform is empty',
        );
      }
    }
  }
}
