import { Game } from '@/domain/entities/Game'
import { GameNotFoundError } from '../errors/GameNotFoundError'

export class ShowGameUseCase {
    constructor(private readonly gameProtocol) { }

    async execute(uuid: string): Promise<Game> {
        const game = await this.gameProtocol.findByUuid(uuid)

        if (!game) throw new GameNotFoundError()

        return game
    }
}
