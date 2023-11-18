import {
    INestApplication,
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoggingConfigService } from './commons/config/logging/logging-config.service';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    logger = LoggingConfigService.getInstance().getLogger();
    constructor() {
        super({
            log: ['query', 'info', 'warn'],
            errorFormat: 'pretty',
        });
    }
    async onModuleInit() {
        await this.$connect();
        this.$use(async (params, next) => {
            const before = Date.now();
            const result = await next(params);
            const after = Date.now();

            this.logger.log(
                `Query ${params.model}.${params.action} took ${
                    after - before
                }ms`,
            );

            return result;
        });
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }

    async enableshutDownHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
}
