import { Controller } from '@/domain/bases/Controller';
import { GameUseCase } from '../features/GameUseCase';
import { HttpRequest, HttpResponse } from '@/domain/protocols/HttpProtocol';
import { Game } from '@/domain/entities/Game';

export class GameController extends Controller {
    constructor(private readonly gameUseCase: GameUseCase) {
        super()
    }

    handle(req: HttpRequest, res: HttpResponse): HttpResponse {
        try {
            const game = new Game(req.body)
            this.gameUseCase.execute(game)

            return this.jsonResponse(201, game, res)
        } catch (error) {
            return this.sendError(error, res)
        }
    }
}