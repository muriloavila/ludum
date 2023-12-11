import { Platform } from "@/domain/entities/Platform";

export interface PlatformProtocol {
    add(plataform: Platform): Promise<void>
}