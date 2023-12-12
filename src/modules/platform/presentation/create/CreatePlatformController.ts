import { Platform } from '@/domain/entities/Platform'
import { CreatePlatformUseCase } from '@/modules/platform/features/create/CreatePlatformUseCase'
import { HttpRequest, HttpResponse } from '@/domain/protocols/HttpProtocol'
import { PlatformMissingParameterError } from '@/modules/platform/errors/PlatformMissingParameterError'
import { Controller } from '@/domain/bases/Controller'

export class CreatePlatformController extends Controller {
    constructor(private readonly createPlatformUseCase: CreatePlatformUseCase) {
        super()
    }

    async handle(req: HttpRequest, res: HttpResponse): Promise<HttpResponse> {
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
            await this.createPlatformUseCase.execute(platform)

            return this.jsonResponse(201, platform, res)
        } catch (error) {
            return this.sendError(error, res)
        }
    }
}
