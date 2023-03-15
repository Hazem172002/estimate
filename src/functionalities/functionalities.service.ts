import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';
import { PlatformsService } from '../platforms/platforms.service';

@Injectable()
export class FunctionalitiesService {
  constructor(
    private responseService: ResponseService,
    private platformsService: PlatformsService,
    private prisma: PrismaService,
  ) {}

  async getFunctionalitiesWithPlatformHoursAndPrice(
    res,
    orderId: string,
    ids: string[] = [],
  ) {
    const platformIdsHourPrice =
      await this.platformsService.getPlatformsIdsHoursInOrder(orderId);

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
      where: ids.length ? { id: { in: ids } } : {},
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

    return functionalitiesWithRequirements;
  }

  async getFunctionalities(res, orderId: string) {
    const functionalitiesWithRequirements =
      await this.getFunctionalitiesWithPlatformHoursAndPrice(res, orderId);

    return this.responseService.success(
      res,
      'Functionalities',
      functionalitiesWithRequirements,
    );
  }
}
