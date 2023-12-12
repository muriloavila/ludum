import { HttpResponse } from '@/domain/protocols/HttpProtocol'

export class HttpResponseStub implements HttpResponse {
    statusCode: number
    body: any

    constructor() {
        this.statusCode = 200
        this.body = {}
    }

    json(body: any): HttpResponse {
        this.body = body
        return this
    }

    status(statusCode: number): HttpResponse {
        this.statusCode = statusCode
        return this
    }
}
