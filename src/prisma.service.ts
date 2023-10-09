import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        super({
            log: ['query', 'info', 'warn'],
            errorFormat: 'pretty',
        });
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }

    async enableshutDownHooks(app: INestApplication) {
       this.$on('beforeExit', async () => {
        await app.close();
       }
    }
}
