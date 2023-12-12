import { Game } from '@/domain/entities/Game'
import { Platform } from '@/domain/entities/Platform'
import { makeSut, mockGame, mockPlatform } from '../stubs/GameStub'

describe('GameUseCase', () => {
    test('should create a game', () => {
        const game = new Game(mockGame)

        expect(game instanceof Game).toBe(true)
    })

    test('should create a game with uuid', () => {
        const game = new Game(mockGame)

        expect(game.uuid).toBeDefined()
    })

    test('should create a game with platform', () => {
        const game = new Game(mockGame)

        expect(game.platform instanceof Platform).toBe(true)
    })

    test('should create a game with platform uuid', () => {
        const game = new Game(mockGame)

        expect(game.platform.uuid).toBeDefined()
    })

    test('should call add function with correct values', () => {
        const { addGameStub } = makeSut()
        const game = new Game(mockGame)

        const addSpy = jest.spyOn(addGameStub, 'add')

        addGameStub.add(game)

        expect(addSpy).toHaveBeenCalledWith(game)
    })

    test('should call useCase with correct values', async () => {
        const { gameUseCaseStub, addGameStub } = makeSut()
        const game = new Game(mockGame)

        const addSpy = jest.spyOn(addGameStub, 'add')
        const executeSpy = jest.spyOn(gameUseCaseStub, 'execute')

        await gameUseCaseStub.execute(game)

        expect(addSpy).toHaveBeenCalledWith(game)
        expect(executeSpy).toHaveBeenCalledWith(game)
    })

    test('should throw if useCase throws', () => {
        const { gameUseCaseStub } = makeSut()
        const game = new Game(mockGame)

        jest.spyOn(gameUseCaseStub, 'execute').mockImplementationOnce(() => { throw new Error() })

        expect(() => { gameUseCaseStub.execute(game) }).toThrow()
    })

    test('should call controller with correct values', async () => {
        const { sut, gameUseCaseStub, httpResponseStub } = makeSut()
        const game = new Game(mockGame)

        const executeSpy = jest.spyOn(gameUseCaseStub, 'execute')

        const response = await sut.handle({ body: mockGame }, httpResponseStub)

        expect(executeSpy).toHaveBeenCalledWith(game)

        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual(game)
    })

    test('should return a error if controller receive no name', async () => {
        const { sut, httpResponseStub } = makeSut()
        const httpResponse = await sut.handle({ body: { platform: mockPlatform } }, httpResponseStub)

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toEqual({ error: 'Missing parameter: name' })
    })

    test('should return a error if controller receive no platform', async () => {
        const { sut, httpResponseStub } = makeSut()
        const httpResponse = await sut.handle({ body: { name: 'Game' } }, httpResponseStub)

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toEqual({ error: 'Missing parameter: platform' })
    })

    test('should return a error if platform not exists', async () => {
        const { sut, httpResponseStub, platformProtocol } = makeSut()
        jest.spyOn(platformProtocol, 'findByUuid').mockImplementationOnce(async () => { return await Promise.resolve(null) })

        const httpResponse = await sut.handle({ body: { name: 'Game', platform: {} } }, httpResponseStub)

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toEqual({ error: 'Platform not found' })
    })
})
