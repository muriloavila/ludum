import { Game } from '@/domain/entities/Game'
import { GameProtocol } from '@/domain/protocols/GameProtocol'
import { PlatformProtocol } from '@/domain/protocols/PlatformProtocol'
import { PlatformNotFoundError } from '@/modules/platform/errors/PlatformNotFoundError'

export class CreateGameUseCase {
    constructor(private readonly gameProtocol: GameProtocol, private readonly platformProtocol: PlatformProtocol) { }

    async execute(game: Game): Promise<void> {
        const platform = await this.platformProtocol.findByUuid(game.platformUuid)
        if (!platform) throw new PlatformNotFoundError()

        game.platform = platform

        await this.gameProtocol.add(game)
    }
}
