import { Controller } from '@/domain/bases/Controller'
import { GameUseCase } from '../features/GameUseCase'
import { HttpRequest, HttpResponse } from '@/domain/protocols/HttpProtocol'
import { Game } from '@/domain/entities/Game'
import { GameMissingParameterError } from '../errors/GameMissingParameterError'

export class GameController extends Controller {
    constructor(private readonly gameUseCase: GameUseCase) {
        super()
    }

    async handle(req: HttpRequest, res: HttpResponse): Promise<HttpResponse> {
        try {
            if (!req.body.name) throw new GameMissingParameterError('name')

            if (!req.body.platform) throw new GameMissingParameterError('platform')

            const game = new Game(req.body)
            await this.gameUseCase.execute(game)

            return this.jsonResponse(201, game, res)
        } catch (error: any) {
            return this.sendError(error, res)
        }
    }
}
