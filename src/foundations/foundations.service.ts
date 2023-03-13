import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FoundationsService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
  ) {}

  async getFoundations(res, body) {
    const { orderId } = body;
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
    const foundations = await this.prisma.categories.findMany({
      include: {
        Foundations: {
          include: {
            PlatformsFoundations: {
              where: {
                platformId: {
                  in: Object.keys(platformIdsHourPrice),
                },
              },
            },
          },
        },
      },
    });
    const categoriesWithFoundations = [];

    foundations.map((e) => {
      const category = { ...e, foundations: [] };
      e.Foundations.map((j) => {
        let hours = 0;
        let price = 0;
        j.PlatformsFoundations.forEach((e) => {
          hours += e.hours;
          price += platformIdsHourPrice[e.platformId] * e.hours;
        });
        delete j.PlatformsFoundations;
        category.foundations.push({
          ...j,
          hours,
          price,
        });
      });
      delete category.Foundations;
      categoriesWithFoundations.push(category);
    });

    return this.responseService.success(
      res,
      'foundations',
      categoriesWithFoundations,
    );
  }
}
