import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';
import { FunctionalitiesService } from '../functionalities/functionalities.service';
import { OrderFoundations } from './dto/order-foundations.dto';
import { OrderFunctionalities } from './dto/order-functionalities.dto';
import { OrderPlatform } from './dto/order-platform.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
    private functionalitiesService: FunctionalitiesService,
  ) {}

  async addOrderPlatform(res, orderPlatforms: OrderPlatform) {
    const platformsIds = [...new Set(orderPlatforms.platforms)];

    // Check if body not contains any platforms ids., if length === 0 , return bad request.
    if (!platformsIds.length) {
      return this.responseService.badRequest(
        res,
        'validation error',
        'platforms property is empty, please choose some platforms ids.',
      );
    }

    let platformCost = 0;
    let platformHours = 0;
    const selectedPlatforms = [];
    const platformsInDb = await this.prisma.platforms.findMany();

    platformsIds.forEach((id) => {
      const platform = platformsInDb.find((p) => p.id === id);
      if (!platform) {
        return this.responseService.notFound(
          res,
          `Platform #${id} is not exist.`,
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
      `Order created with platforms : ${platformsIds.join(', ')}`,
      { orderId: addOrder.id, order: addOrder },
    );
  }

  async addOrderFunctionalities(res, body: OrderFunctionalities) {
    let { orderId, functionalitiesIDs } = body;
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
    if (!order) {
      return this.responseService.notFound(
        res,
        `Order #${orderId} is not exist`,
      );
    }

    const functionalitiesBody =
      await this.functionalitiesService.getFunctionalitiesWithPlatformHoursAndPrice(
        res,
        orderId,
        functionalitiesIDs,
      );

    order.FunctionalityOrders.forEach((fo) => {
      if (functionalitiesIDs.includes(fo.funcationalityId)) {
        const idIndex = functionalitiesIDs.indexOf(fo.funcationalityId);
        const index = functionalitiesBody.findIndex(
          (x) => x.id === fo.funcationalityId,
        );
        functionalitiesBody.splice(index, 1);
        functionalitiesIDs.splice(idIndex, 1);
      }
    });

    if (!functionalitiesBody.length) {
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

    // Update The Order with new functionalities.
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
      `Order #${orderId} has been updated successfully`,
      newOrder,
    );
  }

  async addOrderFoundations(res, body) {
    const { orderId } = body;
    let { foundationIds } = body;
    foundationIds = [...new Set(foundationIds)];
    const systemFoundationsIds = [];
    const orderFoundationsIds = [];
    const orderPlatforms = [];
    let hours = 0;
    let cost = 0;
    const order = await this.prisma.orders.findFirst({
      where: {
        id: orderId,
      },
      include: {
        FoundationOrders: true,
        PlatformOrders: {
          include: {
            Platform: true,
          },
        },
      },
    });
    if (!order) {
      return this.responseService.notFound(
        res,
        'this orderId id not in db choose platform first',
      );
    }
    const systemFoundations = await this.prisma.foundations.findMany({
      select: {
        id: true,
      },
    });
    systemFoundations.map((e) => {
      systemFoundationsIds.push(e.id);
    });
    order.FoundationOrders.map((e) => {
      orderFoundationsIds.push(e.foundationId);
    });
    foundationIds.map((e, index) => {
      if (!systemFoundationsIds.includes(e)) {
        return this.responseService.conflict(res, 'invalid foundation id', {
          foundationId: e,
        });
      }
      if (orderFoundationsIds.includes(e)) {
        foundationIds.splice(index, 1);
      }
    });
    if (foundationIds.length === 0) {
      return this.responseService.conflict(
        res,
        'all foundations is already in this orderId',
      );
    }
    order.PlatformOrders.map((e) => {
      orderPlatforms.push(e.platformId);
    });
    const platformFoundations = await this.prisma.platformsFoundations.findMany(
      {
        where: {
          platformId: {
            in: orderPlatforms,
          },
        },
      },
    );
    platformFoundations.map((e) => {
      hours += e.hours;
    });

    order.PlatformOrders.map((e) => {
      cost += e.Platform.hourPrice * hours;
    });
    const lastFoundations = [];
    foundationIds.map((e) => {
      lastFoundations.push({ foundationId: e });
    });
    await this.prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        hours: {
          increment: hours,
        },
        cost: {
          increment: cost,
        },
        FoundationOrders: {
          createMany: {
            data: lastFoundations,
          },
        },
      },
    });
    return this.responseService.success(res, 'as', foundationIds);
  }

  async getOrderFinalDetails(orderId: string) {
    const order = await this.prisma.orders.findFirst({
      where: {
        id: orderId,
      },
      include: {
        PlatformOrders: {
          include: {
            Platform: {
              include: {
                PlatformsFoundations: {
                  select: {
                    hours: true,
                    foundationId: true,
                  },
                },
                PlatformsFunctionalities: {
                  select: {
                    hours: true,
                    functionalityId: true,
                  },
                },
              },
            },
          },
        },
        FoundationOrders: {
          select: { foundationId: true },
        },
        FunctionalityOrders: {
          select: { funcationalityId: true },
        },
      },
    });

    const foundationsInOrder = order.FoundationOrders.map(
      (f) => f.foundationId,
    );
    const functionalitiesInOrder = order.FunctionalityOrders.map(
      (f) => f.funcationalityId,
    );

    const orderPlatforms = order.PlatformOrders.map((po) => po.Platform).map(
      (p) => {
        p.PlatformsFoundations = p.PlatformsFoundations.filter((f) =>
          foundationsInOrder.includes(f.foundationId),
        );
        p.PlatformsFunctionalities = p.PlatformsFunctionalities.filter((f) =>
          functionalitiesInOrder.includes(f.functionalityId),
        );
        return p;
      },
    );
    console.log(orderPlatforms);

    const platformsDetails = {};
    orderPlatforms.forEach((p) => {
      let price = p.hourPrice * p.hours;
      let hours = p.hours;
      const foundationsHours = p.PlatformsFoundations.map(
        (f) => f.hours,
      ).reduce((acc, curr) => acc + curr, 0);
      const functionalitiesHours = p.PlatformsFunctionalities.map(
        (f) => f.hours,
      ).reduce((acc, curr) => acc + curr, 0);
      hours += foundationsHours + functionalitiesHours;
      price += (foundationsHours + functionalitiesHours) * p.hourPrice;
      platformsDetails[p.name] = { hours, price };
    });

    return {
      orderId,
      finalHours: order.hours,
      finalCost: order.cost,
      platforms: platformsDetails,
    };
  }
}
