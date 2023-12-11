import { BaseError } from "../bases/Error";
import { HttpResponse } from "./HttpProtocol";

export interface ControllerProtocol {
    jsonResponse: (statusCode: number, body: any, res: HttpResponse) => HttpResponse
    sendError: (error: BaseError, res: HttpResponse) => HttpResponse
}