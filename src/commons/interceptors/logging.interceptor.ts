import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    Logger,
    Inject,
    LoggerService,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { APP_URL_PREFIX } from '../constans';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(@Inject(Logger) private readonly logger: LoggerService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        if (!req) {
            return;
        }
        const url = req.url;
        const healthUrl = `${APP_URL_PREFIX}/health`;
        if (!url.startsWith(`${healthUrl}`)) {
            this.logger.debug(
                `${context.getHandler().name} [${req.method} to ${
                    req.url
                }] - INIT`,
                context.getClass().name,
            );
        }

        return next.handle().pipe(
            tap(() => {
                if (!url.startsWith(`${healthUrl}`)) {
                    this.logger.debug(
                        `${context.getHandler().name} [${req.method} to ${
                            req.url
                        }] - END ${Date.now() - now} ms`,
                        context.getClass().name,
                    );
                }
            }),
        );
    }
}
