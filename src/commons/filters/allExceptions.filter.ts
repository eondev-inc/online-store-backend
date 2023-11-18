import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { BaseExceptionFilter } from '@nestjs/core';
import { Error } from './payload-http-exception.interface';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): any {
        console.log('exception :>> ', exception);

        const httpContext = host.switchToHttp();
        const res = httpContext.getResponse<FastifyReply>();

        if (exception instanceof HttpException) {
            return super.catch(exception, host);
        }

        const customError = this.createCustomException(
            exception?.code || 500,
            exception?.message,
            exception?.type,
            exception?.detail,
            exception?.trace_id,
            exception?.response,
        );
        return res.status(customError.status).send(customError);
    }

    createCustomException(
        status?: number,
        message?: string,
        type?: string,
        detail?: string,
        trace_id?: string,
        response?: string[],
    ) {
        return {
            status: status,
            error: {
                detail: detail || '',
                message: message || '',
                type: type || 'InternalError',
                code: status || 500,
                trace_id: trace_id || Math.random().toString(16).substr(2, 16),
                response: response || [],
                status: null,
            },
        };
    }
}
