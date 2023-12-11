import { HttpResponse } from "@/domain/protocols/HttpProtocol"
import { BaseError } from "./Error"
import { ControllerProtocol } from "../protocols/ControllerProtocol"

export class Controller implements ControllerProtocol {
    jsonResponse(statusCode: number, body: any, res: HttpResponse): HttpResponse {
        return res.status(statusCode).json(body)
    }

    sendError(error: BaseError, res: HttpResponse): HttpResponse {
        return this.jsonResponse(error.statusCode, {
            error: error.message
        }, res)
    }
}