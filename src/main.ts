import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { APP_URL_PREFIX } from './commons/constans';
import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerModule,
} from '@nestjs/swagger';
import { LoggingInterceptor } from './commons/interceptors';
import { LoggingConfigService } from './commons/config/logging/logging-config.service';
import { AppConfigService } from './commons/config/app/app-config.service';
import { AllExceptionsFilter } from './commons/filters/allExceptions.filter';
import { AppConfig } from './commons/config/app/enums/app-config.enum';
import { Settings } from 'luxon';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import * as fastifyMultipart from '@fastify/multipart';
async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: false }),
    );
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    const { httpAdapter } = app.get(HttpAdapterHost);
    const logger = LoggingConfigService.getInstance().getLogger();
    const appConfig: AppConfigService =
        app.get<AppConfigService>(AppConfigService);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    //Prisma service S//Prisma Service Setup for avoid bugs on shutting down the API
    //const prismaService: PrismaService = app.get<PrismaService>(PrismaService);
    //await prismaService.enableshutDownHooks(app);

    //Set use global Interceptor
    app.useGlobalInterceptors(new LoggingInterceptor(logger));

    // Set use global Filters
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    //Allow class-validator to inject dependencies
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.enableVersioning({
        type: VersioningType.URI,
    });
    //Enable CORS
    app.enableCors({
        origin: '*',
        preflightContinue: true,
        optionsSuccessStatus: 200,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );
    // BigInt from DB To String response
    (BigInt.prototype as any).toJSON = function () {
        return this.toString();
    };

    // Set Global url prefix (api/v2)
    app.setGlobalPrefix(APP_URL_PREFIX, {
        exclude: [
            { path: '/', method: RequestMethod.GET },
            { path: 'api/health/liveness', method: RequestMethod.GET },
            { path: 'api/health/readiness', method: RequestMethod.GET },
        ],
    });

    //Definir uso de multipart
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 10000000,
        },
    });
    app.getHttpAdapter()
        .getInstance()
        .addContentTypeParser('text/csv', (request, payload, done) => {
            let csvData = '';
            payload.on('data', (chunk) => {
                csvData += chunk;
            });
            payload.on('end', () => {
                done(null, csvData);
            });
            payload.on('error', (err) => {
                done(err, undefined);
            });
        });

    if (String(process.env.NODE_ENV).toLowerCase() === 'development') {
        //Swagger UI for documentation
        const swaggerConfig = new DocumentBuilder()
            .setTitle('Em Agenda Backend API')
            .setDescription('Agenda v2 Backend')
            .setVersion('2.0')
            .addBearerAuth()
            .build();

        //Set Swagger Options
        const swaggerOptions: SwaggerDocumentOptions = {
            operationIdFactory: (controllerKey: string, methodKey: string) =>
                methodKey,
            ignoreGlobalPrefix: false,
        };
        //Init Swagger
        const document = SwaggerModule.createDocument(
            app,
            swaggerConfig,
            swaggerOptions,
        );
        SwaggerModule.setup(`${APP_URL_PREFIX}/docs`, app, document, {
            swaggerOptions: {
                tagsSorter: 'alpha',
                operationsSorter: 'alpha',
            },
        });
    }
    //Define PORT
    const port = appConfig.get(AppConfig.PORT) || 3300;
    const address = appConfig.get(AppConfig.FASTIFY_ADDRESS) || '0.0.0.0';
    Settings.defaultZone = appConfig.get(AppConfig.APP_TIMEZONE);
    Settings.defaultLocale = appConfig.get(AppConfig.APP_LOCALE);

    await app
        .listen(port, address)
        .then(() => logger.log(`Server starting on port ${port} ...`));
    return { logger, port };
}
bootstrap();
