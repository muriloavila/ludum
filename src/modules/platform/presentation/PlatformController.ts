import { Platform } from "@/domain/entities/Platform"
import { PlatformUseCase } from "@/modules/platform/features/PlatformUseCase"
import { HttpRequest, HttpResponse } from "@/domain/protocols/httpProtocol"
import { PlatformMissingParameterError } from "../errors/PlatformMissingParameterError"
import { Controller } from "@/domain/bases/Controller"

export class PlatformController extends Controller {
    constructor(private readonly platformUseCase: PlatformUseCase) {
        super()
    }

    handle(req: HttpRequest, res: HttpResponse): HttpResponse {
        try {
            if (!req.body.name) {
                throw new PlatformMissingParameterError('name')
            }

            if (!req.body.cover) {
                throw new PlatformMissingParameterError('cover')
            }

            if (!req.body.icon) {
                throw new PlatformMissingParameterError('icon')
            }

            const platform = new Platform(req.body)
            this.platformUseCase.execute(platform)


            res.statusCode = 201
            res.body = JSON.stringify(platform)

            return res
        } catch (error) {
            return this.sendError(error)
        }
    }
}