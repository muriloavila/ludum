export interface GameProtocol {
    add(game: Game): Promise<void>
}