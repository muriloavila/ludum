import { GameProtocol } from '@/domain/protocols/GameProtocol'
import { GuideChapterProtocol } from '@/domain/protocols/GuideChapterProtocol'
import { GameNotFoundError } from '@/modules/game/errors/GameNotFoundError'

export class CreateGuideChapterUseCase {
    constructor(private readonly guideChapterProtocol: GuideChapterProtocol, private readonly gameProtocol: GameProtocol) { }

    async execute(guideChapter: any): Promise<void> {
        const game = await this.gameProtocol.findByUuid(guideChapter.gameUuid)

        if (!game) throw new GameNotFoundError()

        guideChapter.game = game

        await this.guideChapterProtocol.add(guideChapter)
    }
}
