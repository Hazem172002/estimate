/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { OnModuleInit, Injectable, INestApplication } from '@nestjs/common';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutDownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
