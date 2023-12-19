import { Game } from '@/domain/entities/Game'
import { GuideChapter } from '@/domain/entities/GuideChapter'
import { makeSut, mockGuideChapter } from '../stubs/GuideChapterStub'

describe('GuideChapterUseCase', () => {
    test('should create a guideChapter', () => {
        const guideChapter = new GuideChapter(mockGuideChapter)

        expect(guideChapter instanceof GuideChapter).toBe(true)
    })

    test('should create a guideChapter with uuid', () => {
        const guideChapter = new GuideChapter(mockGuideChapter)

        expect(guideChapter.uuid).toBeDefined()
    })

    test('should create a guideChapter with game', () => {
        const guideChapter = new GuideChapter(mockGuideChapter)

        expect(guideChapter.game instanceof Game).toBe(true)
    })

    test('should create a guideChapter with game uuid', () => {
        const guideChapter = new GuideChapter(mockGuideChapter)

        expect(guideChapter.game.uuid).toBeDefined()
    })

    test('should call add function with correct values', () => {
        const { addGuideChapterStub } = makeSut()
        const guideChapter = new GuideChapter(mockGuideChapter)

        const addSpy = jest.spyOn(addGuideChapterStub, 'add')

        addGuideChapterStub.add(guideChapter)

        expect(addSpy).toHaveBeenCalledWith(guideChapter)
    })

    test('should call useCase with correct values', async () => {
        const { guideChapterUseCaseStub, addGuideChapterStub } = makeSut()
        const guideChapter = new GuideChapter(mockGuideChapter)

        const addSpy = jest.spyOn(addGuideChapterStub, 'add')
        const executeSpy = jest.spyOn(guideChapterUseCaseStub, 'execute')

        await guideChapterUseCaseStub.execute(guideChapter)

        expect(addSpy).toHaveBeenCalledWith(guideChapter)
        expect(executeSpy).toHaveBeenCalledWith(guideChapter)
    })
})
