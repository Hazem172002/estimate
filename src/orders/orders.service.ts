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

  async addOrderFunctionalities(res, body) {
    let { orderId, functionalitiesBody } = body;
    const functionalitiesOrders = [];
    let hours = 0;
    let cost = 0;
    const order = await this.prisma.orders.findFirst({
      include: {
        FunctionalityOrders: true,
      },
      where: {
        id: orderId,
      },
    });

    const ids = functionalitiesBody.map((f) => f.id);
    order.FunctionalityOrders.forEach((fo) => {
      if (ids.includes(fo.funcationalityId)) {
        const index = functionalitiesBody.findIndex(
          (x) => x.id === fo.funcationalityId,
        );
        functionalitiesBody.splice(index, 1);
      }
    });

    const functionalitiesIds = [...functionalitiesBody.map((f) => f.id)];

    if (!order) {
      return this.responseService.notFound(res, 'order id is not in my db');
    }
    const functionalities = await this.prisma.functionalities.findMany({
      select: {
        id: true,
      },
      where: {
        id: {
          in: functionalitiesIds,
        },
      },
    });
    if (
      functionalitiesIds.length !== functionalities.length ||
      !functionalitiesIds.length
    ) {
      return this.responseService.notFound(
        res,
        'Bad Request, all Functionalities may be in this order or no functionalities were added',
      );
    }

    functionalitiesBody.forEach((f) => {
      hours += f.hours;
      cost += f.price;
      functionalitiesOrders.push({ funcationalityId: f.id });
    });

    const newOrder = await this.prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        hours: { increment: hours },
        cost: { increment: cost },
        FunctionalityOrders: {
          createMany: {
            data: functionalitiesOrders,
          },
        },
      },
    });

    return this.responseService.success(
      res,
      'functionalities added successfully',
      newOrder,
    );
  }

  async addOrderFoundations(res, body) {
    let { orderId, features } = body;
    let hours = 0;
    let cost = 0;
    const foundationOrders = [];
    const orders = await this.prisma.orders.findFirst({
      where: {
        id: orderId,
      },
      select: {
        FoundationOrders: true,
      },
    });
    if (!orders) {
      return this.responseService.notFound(res, 'order id is not in my db');
    }

    const ids = features.map((f) => f.id);

    orders.FoundationOrders.forEach((fo) => {
      if (ids.includes(fo.foundationId)) {
        let idIndex = ids.indexOf(fo.foundationId);
        let index = features.findIndex((f) => f.id === fo.foundationId);
        features.splice(index, 1);
        ids.splice(idIndex, 1);
      }
    });

    const foundationsIds = [...features.map((f) => f.id)];

    const foundations = await this.prisma.foundations.findMany({
      select: {
        id: true,
      },
      where: {
        id: {
          in: foundationsIds,
        },
      },
    });

    if (foundations.length !== foundationsIds.length || !foundations.length) {
      return this.responseService.notFound(
        res,
        'Bad Request, all Foundations may be in this order or no foundations were added',
      );
    }

    features.forEach((f) => {
      hours += f.hours;
      cost += f.price;
      foundationOrders.push({ foundationId: f.id });
    });

    await this.prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        hours: { increment: hours },
        cost: { increment: cost },
        FoundationOrders: {
          createMany: {
            data: foundationOrders,
          },
        },
      },
    });
    return this.responseService.success(res, 'foundations added successfully');
  }
}
