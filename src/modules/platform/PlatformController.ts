import { Platform } from "@/domain/entities/Platform"
import { PlatformUseCase } from "@/modules/platform/PlatformUseCase"
import { HttpRequest, HttpResponse } from "@/domain/protocols/httpProtocol"

export class PlatformController {
    constructor(private readonly platformUseCase: PlatformUseCase) { }

    handle(req: HttpRequest, res: HttpResponse): void {
        const platform = new Platform(req.body)
        this.platformUseCase.execute(platform)
    }
}