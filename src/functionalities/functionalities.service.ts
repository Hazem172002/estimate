import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FunctionalitiesService {
  constructor(
    private responseService: ResponseService,
    private prisma: PrismaService,
  ) {}

  async getFunctionalities(res, body) {
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

    const functionalitiesFromDB = await this.prisma.functionalities.findMany({
      select: {
        id: true,
        name: true,
        subtitle: true,
        FunctionalitiesRequirements: {
          include: {
            Requirement: true,
          },
        },
        PlatformsFunctionalities: {
          where: {
            platformId: {
              in: Object.keys(platformIdsHourPrice),
            },
          },
        },
      },
    });

    const functionalitiesWithRequirements = [];

    functionalitiesFromDB.map((f) => {
      const functionality = { ...f, requirements: [] };
      let hours = 0;
      let price = 0;
      f.PlatformsFunctionalities.forEach((pf) => {
        hours += pf.hours;
        price += platformIdsHourPrice[pf.platformId] * pf.hours;
      });
      functionality.requirements =
        functionality.FunctionalitiesRequirements.map((e) => e.Requirement);
      delete functionality.FunctionalitiesRequirements;
      delete functionality.PlatformsFunctionalities;

      functionalitiesWithRequirements.push({ ...functionality, hours, price });
    });

    return this.responseService.success(
      res,
      'Functionalities',
      functionalitiesWithRequirements,
    );
  }
}
