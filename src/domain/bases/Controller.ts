import { HttpResponse } from "@/domain/protocols/httpProtocol"
import { BaseError } from "./Error"

export class Controller {
    jsonResponse(statusCode: number, body: any): HttpResponse {
        return {
            statusCode,
            body: JSON.stringify(body)
        }
    }

    sendError(error: BaseError): HttpResponse {
        return this.jsonResponse(error.statusCode, {
            error: error.message
        })
    }
}