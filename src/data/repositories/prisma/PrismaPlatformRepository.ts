import { Platform } from "@/domain/entities/Platform";
import { PlatformProtocol } from "@/domain/protocols/PlatformProtocol";
import { Prisma, PrismaClient } from "@prisma/client";

export class PrismaPlatformRepository implements PlatformProtocol {
    private prismaClient = new PrismaClient()

    async add(platform: Platform): Promise<void> {
        try {
            await this.prismaClient.platform.create({
                data: platform
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}