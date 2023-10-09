import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig } from './interfaces/app-config.interface';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
    private appConfig: AppConfig;

    constructor(private configService: ConfigService) {
        this.appConfig = this.configService.get<AppConfig>('app');
    }

    get(key: string): any {
        return this.appConfig[key];
    }
}
