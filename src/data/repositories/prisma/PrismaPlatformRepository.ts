import { Platform } from '@/domain/entities/Platform'
import { PlatformProtocol } from '@/domain/protocols/PlatformProtocol'
import { Prisma, PrismaClient } from '@prisma/client'

export class PrismaPlatformRepository implements PlatformProtocol {
    private readonly prismaClient = new PrismaClient()

    async add(platform: Platform): Promise<void> {
        try {
            await this.prismaClient.platform.create({
                data: platform.toJSON() as Prisma.PlatformCreateInput
            })
        } catch (error: any) {
            throw new Error()
        }
    }

    async findByUuid(uuid: string): Promise<Platform | null> {
        try {
            const platform = await this.prismaClient.platform.findFirst({
                where: { uuid }
            })

            if (!platform) return null

            return new Platform(platform)
        } catch (error: any) {
            throw new Error()
        }
    }
}
