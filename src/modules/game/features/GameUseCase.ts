import { Game } from '@/domain/entities/Game'
import { GameProtocol } from '@/domain/protocols/GameProtocol'
import { PlatformProtocol } from '@/domain/protocols/PlatformProtocol'

export class GameUseCase {
    constructor(private readonly gameProtocol: GameProtocol, private readonly platformProtocol: PlatformProtocol) { }

    async execute(game: Game): Promise<void> {
        console.log(game)
        if (!game.platform) throw new Error('Platform must be provided')

        const platform = await this.platformProtocol.findByUuid(game.platform.uuid)
        if (!platform) throw new Error('Platform not found')

        await this.gameProtocol.add(game)
    }
}
