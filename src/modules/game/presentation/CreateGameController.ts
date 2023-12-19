import { Controller } from '@/domain/bases/Controller'
import { HttpRequest, HttpResponse } from '@/domain/protocols/HttpProtocol'
import { Game } from '@/domain/entities/Game'
import { GameMissingParameterError } from '@/modules/game/errors/GameMissingParameterError'
import { CreateGameUseCase } from '@/modules/game/features/CreateGameUseCase'

export class CreateGameController extends Controller {
    constructor(private readonly gameUseCase: CreateGameUseCase) {
        super()
    }

    async handle(req: HttpRequest, res: HttpResponse): Promise<HttpResponse> {
        try {
            if (!req.body.name) throw new GameMissingParameterError('name')

            if (!req.body.platformUuid) throw new GameMissingParameterError('platformUuid')

            const game = new Game({ ...req.body, platformUuid: req.body.platformUuid })
            await this.gameUseCase.execute(game)

            return this.jsonResponse(201, game, res)
        } catch (error: any) {
            console.log(error)
            if (!error.statusCode) error.statusCode = 500
            return this.sendError(error, res)
        }
    }
}
