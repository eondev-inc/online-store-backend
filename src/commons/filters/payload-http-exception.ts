import { Error } from './payload-http-exception.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PayloadHttpException extends HttpException {
    private errorBody: any;

    constructor(error: Error, httpStatus?: HttpStatus) {
        const httpStatusCode = httpStatus || error.status || error.code || 500;
        const errorBody = PayloadHttpException.createErrorBody(
            httpStatusCode,
            error,
        );

        super(errorBody, httpStatusCode);
        this.errorBody = errorBody;
    }

    private static createErrorBody(status: number, error: Error): any {
        const errorBody = {
            status: status,
            error: {
                detail: error.detail || '',
                message: '',
                type: '',
                code: '',
                trace_id: Math.random().toString(16).substr(2, 16),
                response: {},
                status: null,
            },
        };

        if (error.type || error.code) {
            PayloadHttpException.assignErrorBody(errorBody, error);
        } else {
            errorBody.error.detail = error.detail;
            errorBody.error.message = error.message || error.toString();
            errorBody.error.type = error.type || error.valueOf().toString();
            errorBody.error.code = error.code || null;
            errorBody.error.response = error.response || null;
        }

        return errorBody;
    }

    private static assignErrorBody(errorBody: any, error: Error): void {
        const exceptionType = error.constructor.name;

        errorBody.error.detail = error.detail || errorBody.error.detail;
        errorBody.error.message = error.message;
        errorBody.error.type = error.type;
        errorBody.error.code = error.code;

        if (
            [
                'NotFoundException',
                'ForbiddenException',
                'BadRequestException',
            ].includes(exceptionType)
        ) {
            errorBody.error.type =
                error.response?.type || error.valueOf().toString();
            errorBody.error.code = error.response?.code || error.status;
        }
    }

    toJSON() {
        return this.errorBody;
    }
}
