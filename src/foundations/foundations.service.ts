import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';
import { PlatformsService } from '../platforms/platforms.service';

@Injectable()
export class FoundationsService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
    private platformsService: PlatformsService,
  ) {}

  async getFoundationsWithPlatformHoursAndPrice(
    res,
    orderId: string,
    ids: string[] = [],
  ) {
    const platformIdsHourPrice =
      await this.platformsService.getPlatformsIdsHoursInOrder(orderId);

    const foundationsFromDB = await this.prisma.categories.findMany({
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
          where: ids.length ? { id: { in: ids } } : {},
        },
      },
    });

    const categoriesWithFoundations = [];

    foundationsFromDB.map((e) => {
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

    return categoriesWithFoundations;
  }

  async getFoundations(res, orderId: string) {
    const order = await this.prisma.orders.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return this.responseService.notFound(
        res,
        `Order #${orderId} is not exist`,
      );
    }
    const categoriesWithFoundations =
      await this.getFoundationsWithPlatformHoursAndPrice(res, orderId);
    return this.responseService.success(
      res,
      'Foundations',
      categoriesWithFoundations,
    );
  }
}
