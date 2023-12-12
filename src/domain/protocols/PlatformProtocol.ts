import { Platform } from '@/domain/entities/Platform'

export interface PlatformProtocol {
    add: (platform: Platform) => Promise<void>
    findByUuid: (uuid: string) => Promise<Platform | null>
}

export interface ShowPlatformRequest {
    uuid: string
}
