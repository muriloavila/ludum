import { Game } from '@/domain/entities/Game'
import { GameProtocol } from '@/domain/protocols/GameProtocol'
import { Prisma, PrismaClient } from '@prisma/client'

export class PrismaGameRepository implements GameProtocol {
    private readonly prismaClient: PrismaClient = new PrismaClient()

    async add(game: Game): Promise<void> {
        try {
            await this.prismaClient.game.create({
                data: game.toPersist() as Prisma.GameCreateInput
            })
        } catch (error) {
            console.log(error)
        }
    }
}
