import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { PayloadHttpException } from './commons/filters/payload-http-exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<any>();
        const status = exception.getStatus();

        const exceptionResponse: any = exception.getResponse();
        // console.log('name :>> ', exception.constructor.name);

        response.status(status).send(
            new PayloadHttpException({
                detail: exceptionResponse.detail || exception.detail,
                message: exceptionResponse?.message,
                type: exceptionResponse?.error,
                code: exceptionResponse?.statusCode || status,
                status: status,
            }),
        );

        // response.status(status).send(exception);
    }
}
