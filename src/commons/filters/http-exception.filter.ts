import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    NotFoundException,
    InternalServerErrorException,
    NotAcceptableException,
    BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(
    HttpException,
    NotFoundException,
    InternalServerErrorException,
    NotAcceptableException,
    BadRequestException,
)
export class HttpExceptionFilter implements ExceptionFilter {
    async catch(
        exception:
            | HttpException
            | NotFoundException
            | InternalServerErrorException
            | NotAcceptableException
            | BadRequestException,
        host: ArgumentsHost,
    ): Promise<void> {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.getResponse();

        response.status(message['status'] || status).json({
            statusCode: message['status'] || status,
            timestamp: new Date().toISOString(),
            method: request.method,
            path: request.url,
            message: message['message'] || null,
            error: message['error'] || null,
        });
    }
}
