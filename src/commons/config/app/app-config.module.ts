import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import appConfig from './app-config';
import { AppConfigService } from './app-config.service';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            expandVariables: true,
            load: [appConfig],
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                NODE_ENV: Joi.string().required(),
                FASTIFY_ADDRESS: Joi.string().required(),
                DATABASE_URL: Joi.string().required(),
                APP_LOCALE: Joi.string().required(),
                APP_TIMEZONE: Joi.string().required(),
            }),
            isGlobal: true,
        }),
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
