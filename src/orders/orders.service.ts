import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';
import { FoundationsService } from '../foundations/foundations.service';
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
    private foundationsService: FoundationsService,
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

    let deletedHours = 0;
    let deletedCost = 0;

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

    const functionalitiesAlreadyInOrder = order.FunctionalityOrders.map(
      (f) => f.funcationalityId,
    );
    delete order.FunctionalityOrders;

    const addedFunctionalities = functionalitiesIDs.filter(
      (x) => !functionalitiesAlreadyInOrder.includes(x),
    );

    const deletedFunctionalities = functionalitiesAlreadyInOrder.filter(
      (x) => !functionalitiesIDs.includes(x),
    );

    if (!addedFunctionalities.length && !deletedFunctionalities.length) {
      return this.responseService.success(
        res,
        `Order #${orderId} already has these functionalities`,
        order,
      );
    }

    const functionalitiesToAdd = addedFunctionalities.length
      ? await this.functionalitiesService.getFunctionalitiesWithPlatformHoursAndPrice(
          res,
          orderId,
          addedFunctionalities,
        )
      : [];

    const functionalitiesToRemove = deletedFunctionalities.length
      ? await this.functionalitiesService.getFunctionalitiesWithPlatformHoursAndPrice(
          res,
          orderId,
          deletedFunctionalities,
        )
      : [];

    if (!functionalitiesToAdd.length && !functionalitiesToRemove.length) {
      return this.responseService.success(
        res,
        `Order #${orderId} nothing changed.`,
        order,
      );
    }

    functionalitiesToAdd.forEach((f) => {
      hours += f.hours;
      cost += f.price;
      functionalitiesOrders.push({ funcationalityId: f.id });
    });

    functionalitiesToRemove.forEach((f) => {
      deletedHours += f.hours;
      deletedCost += f.price;
    });

    // Update The Order with new functionalities.
    const newOrder = await this.prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        hours: { increment: hours - deletedHours },
        cost: { increment: cost - deletedCost },
        FunctionalityOrders: {
          createMany: {
            data: functionalitiesOrders,
          },
          deleteMany: {
            funcationalityId: {
              in: deletedFunctionalities,
            },
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

  async addOrderFoundations(res, body: OrderFoundations) {
    let { orderId, foundationIds } = body;
    const foundationsOrders = [];
    let hours = 0;
    let cost = 0;

    let deletedHours = 0;
    let deletedCost = 0;

    const order = await this.prisma.orders.findFirst({
      include: {
        FoundationOrders: true,
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

    const foundationsAlreadyInOrder = order.FoundationOrders.map(
      (f) => f.foundationId,
    );
    delete order.FoundationOrders;

    const addedFoundations = foundationIds.filter(
      (x) => !foundationsAlreadyInOrder.includes(x),
    );

    const deletedFoundations = foundationsAlreadyInOrder.filter(
      (x) => !foundationIds.includes(x),
    );

    if (!addedFoundations.length && !deletedFoundations.length) {
      return this.responseService.success(
        res,
        `Order #${orderId} already has these foundations`,
        order,
      );
    }

    const foundationsToAdd = addedFoundations.length
      ? await this.foundationsService.getFoundationsWithPlatformHoursAndPrice(
          res,
          orderId,
          addedFoundations,
        )
      : [];

    const foundationsToRemove = deletedFoundations.length
      ? await this.foundationsService.getFoundationsWithPlatformHoursAndPrice(
          res,
          orderId,
          deletedFoundations,
        )
      : [];

    if (!foundationsToAdd.length && !foundationsToRemove.length) {
      return this.responseService.success(
        res,
        `Order #${orderId} nothing changed.`,
        order,
      );
    }

    foundationsToAdd
      .map((a) => a.foundations)
      .flat()
      .forEach((f) => {
        hours += f.hours;
        cost += f.price;
        foundationsOrders.push({ foundationId: f.id });
      });

    foundationsToRemove
      .map((a) => a.foundations)
      .flat()
      .forEach((f) => {
        deletedHours += f.hours;
        deletedCost += f.price;
      });

    // Update The Order with new functionalities.
    const newOrder = await this.prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        hours: { increment: hours - deletedHours },
        cost: { increment: cost - deletedCost },
        FoundationOrders: {
          createMany: {
            data: foundationsOrders,
          },
          deleteMany: {
            foundationId: {
              in: deletedFoundations,
            },
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
    const teamMembers = [];
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
      teamMembers.push({ developer: p.name, hours, price });
    });

    return {
      orderId,
      finalHours: order.hours,
      finalCost: order.cost,
      teamMembers,
    };
  }
}
