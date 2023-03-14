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

  async getFoundations(res, orderId: string) {
    const platformIdsHourPrice =
      await this.platformsService.getPlatformsIdsHoursInOrder(orderId);

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

    console.log({ foundations });

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
