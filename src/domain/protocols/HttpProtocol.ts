export interface HttpResponse {
    statusCode: number
    body: any
    json: (body: any) => HttpResponse
    status: (statusCode: number) => HttpResponse
}

export interface HttpRequest {
    body?: any
}