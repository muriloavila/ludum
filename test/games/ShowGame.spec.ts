import { Game } from '@/domain/entities/Game'
import { makeSut, mockGame } from '../stubs/GameStub'
import crypto from 'crypto'

describe('ShowGameUseCase', () => {
    test('should return a error if game not exists', async () => {
        const { addGameStub, showGameUseCaseStub } = makeSut()

        const findSpy = jest.spyOn(addGameStub, 'findByUuid').mockImplementationOnce(async () => { })
        const useCaseSpy = jest.spyOn(showGameUseCaseStub, 'execute')

        showGameUseCaseStub.execute({ uuid: crypto.randomUUID() }).catch((error) => {
            expect(error).toEqual(new Error('Game not found'))
        })

        expect(findSpy).toHaveBeenCalledTimes(1)
        expect(useCaseSpy).toHaveBeenCalledTimes(1)
    })

    test('should return true if game exists', async () => {
        const { addGameStub, showGameUseCaseStub } = makeSut()

        const findSpy = jest.spyOn(addGameStub, 'findByUuid')
        const useCaseSpy = jest.spyOn(showGameUseCaseStub, 'execute')

        const game = showGameUseCaseStub.execute({ uuid: mockGame.uuid })

        expect(findSpy).toHaveBeenCalledTimes(1)
        expect(useCaseSpy).toHaveBeenCalledTimes(1)

        await expect(game).resolves.toEqual(new Game(mockGame))
    })
})
