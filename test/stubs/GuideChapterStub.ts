import { Game } from '@/domain/entities/Game'
import { mockGame as game } from './GameStub'
import { GuideChapter } from '@/domain/entities/GuideChapter'
import { GuideChapterProtocol } from '@/domain/protocols/GuideChapterProtocol'
import { CreateGuideChapterUseCase } from '@/modules/guideChapter/features/CreateGuideChapterUseCase'
import { GameProtocol } from '@/domain/protocols/GameProtocol'

export const mockGame = new Game(game)

export const mockGuideChapter = {
    game: mockGame,
    gameUuid: mockGame.uuid,
    url: 'https://www.example.com',
    name: 'Guide Chapter',
    isCompleted: false
}

export const makeSut = (): any => {
    class AddGuideChapterStub implements GuideChapterProtocol {
        async add(guideChapter: GuideChapter): Promise<void> { await Promise.resolve() }
    }

    class GameProtocolStub implements GameProtocol {
        async add(game: Game): Promise<void> { await Promise.resolve() }
        async findByUuid(uuid: string): Promise<Game> { return await Promise.resolve(mockGame) }
    }

    const gameProtocolStub = new GameProtocolStub()
    const addGuideChapterStub = new AddGuideChapterStub()
    const guideChapterUseCaseStub = new CreateGuideChapterUseCase(addGuideChapterStub, gameProtocolStub)

    return { addGuideChapterStub, guideChapterUseCaseStub }
}
