import { Platform } from "@/domain/entities/Platform";
import { PlatformProtocol } from "@/domain/protocols/PlatformProtocol";

export class PlatformUseCase {
    constructor(private readonly platform: PlatformProtocol) { }

    execute(platform: Platform): void {
        this.platform.add(platform)
    }
}