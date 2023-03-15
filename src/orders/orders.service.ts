import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';
import { OrderFoundations } from './dto/order-foundations.dto';
import { OrderFunctionalities } from './dto/order-functionalities.dto';
import { OrderPlatform } from './dto/order-platform.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
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

    if (!order) {
      return this.responseService.notFound(
        res,
        `Order #${orderId} is not exist`,
      );
    }

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

  async addOrderFoundations(res, body: OrderFoundations) {
    let { orderId, foundationsBody } = body;
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
      return this.responseService.notFound(
        res,
        `Order #${orderId} is not exist`,
      );
    }

    const ids = foundationsBody.map((f) => f.id);

    orders.FoundationOrders.forEach((fo) => {
      if (ids.includes(fo.foundationId)) {
        let idIndex = ids.indexOf(fo.foundationId);
        let index = foundationsBody.findIndex((f) => f.id === fo.foundationId);
        foundationsBody.splice(index, 1);
        ids.splice(idIndex, 1);
      }
    });

    const foundationsIds = [...foundationsBody.map((f) => f.id)];

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

    foundationsBody.forEach((f) => {
      hours += f.hours;
      cost += f.price;
      foundationOrders.push({ foundationId: f.id });
    });

    const newOrder = await this.prisma.orders.update({
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
    return this.responseService.success(
      res,
      'foundations added successfully',
      newOrder,
    );
  }

  async getOrderFinalDetails(orderId: string) {
    // In this function we should return all of this:
    /*
    {
      orderId,
      finalCost,
      finalHours,
      # For Platforms: we should include it hours
      # For Example:
      android: {hours, price},
      ios : {hours, price}
    }
    */
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

    const platformsDetails = {};
    orderPlatforms.forEach((p) => {
      let price = p.hourPrice * p.hours;
      let hours = p.hours;
      const foundationsHours = p.PlatformsFoundations.map(
        (f) => f.hours,
      ).reduce((acc, curr) => acc + curr);
      const functionalitiesHours = p.PlatformsFunctionalities.map(
        (f) => f.hours,
      ).reduce((acc, curr) => acc + curr);
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
