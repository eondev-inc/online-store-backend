import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './commons/config/app/app-config.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { CategoryModule } from './modules/category/category.module';
import {
    PrismaModule,
    PrismaService,
    QueryInfo,
    loggingMiddleware,
} from 'nestjs-prisma';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AppConfigModule,
        AuthModule,
        ProductModule,
        CartModule,
        OrderModule,
        CategoryModule,
        PrismaModule.forRoot({
            isGlobal: true,
            prismaServiceOptions: {
                prismaOptions: {
                    log: ['query', 'info', 'warn'],
                },
                explicitConnect: true,
                middlewares: [
                    loggingMiddleware({
                        logger: new Logger('PrismaMiddleware'),
                        logLevel: 'log', // default is `debug`
                        logMessage: (query: QueryInfo) =>
                            `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
                    }),
                ],
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
