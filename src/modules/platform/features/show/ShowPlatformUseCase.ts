import { Platform } from '@/domain/entities/Platform'
import { PlatformProtocol, ShowPlatformRequest } from '@/domain/protocols/PlatformProtocol'

export class ShowPlatformUseCase {
    constructor(private readonly platformProtocol: PlatformProtocol) { }

    async execute(data: ShowPlatformRequest): Promise<Platform> {
        const platform = await this.platformProtocol.findByUuid(data.uuid)
        console.log(platform)
        if (!platform) throw new Error('Platform not found')

        return platform
    }
}
