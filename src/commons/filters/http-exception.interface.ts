export interface HttpError {
    detail?: string;
    message: string;
    type: string;
    code: any;
    trace_id?: string;
    response?: any;
    status?: any;
}
