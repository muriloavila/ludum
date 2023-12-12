import { Game } from '@/domain/entities/Game'

export interface GameProtocol {
    add: (game: Game) => Promise<void>
}
