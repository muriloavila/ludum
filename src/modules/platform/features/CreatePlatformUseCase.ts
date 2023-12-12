import { Platform } from '@/domain/entities/Platform'
import { PlatformProtocol } from '@/domain/protocols/PlatformProtocol'

export class CreatePlatformUseCase {
    constructor(private readonly platformProtocol: PlatformProtocol) { }

    async execute(platform: Platform): Promise<void> {
        await this.platformProtocol.add(platform)
    }
}
