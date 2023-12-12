import crypto from 'crypto'
import { Game } from '@/domain/entities/Game'
import { Platform } from '@/domain/entities/Platform'
import { GameProtocol } from '@/domain/protocols/GameProtocol'
import { CreateGameUseCase } from '@/modules/game/features/CreateGameUseCase'
import { CreateGameController } from '@/modules/game/presentation/CreateGameController'
import { HttpResponse } from '@/domain/protocols/HttpProtocol'
import { PlatformProtocol } from '@/domain/protocols/PlatformProtocol'

const mockPlatform = new Platform({
    uuid: crypto.randomUUID(),
    name: 'Platform',
    cover: 'http://cover.com',
    icon: 'http://icon.com'
})

const mockGame = {
    uuid: crypto.randomUUID(),
    name: 'Game',
    description: 'Description',
    cover: 'http://cover.com',
    platform: mockPlatform
}

const makeSut = (): any => {
    class AddGameStub implements GameProtocol {
        async add(game: Game): Promise<void> { await Promise.resolve() }
    }

    class PlatformProtocolStub implements PlatformProtocol {
        async add(platform: Platform): Promise<void> { await Promise.resolve() }
        async findByUuid(uuid: string): Promise<Platform> { return await Promise.resolve(mockPlatform) }
    }

    class HttpResponseStub implements HttpResponse {
        statusCode: number
        body: any

        constructor() {
            this.statusCode = 200
            this.body = {}
        }

        json(body: any): HttpResponse {
            this.body = body
            return this
        }

        status(statusCode: number): HttpResponse {
            this.statusCode = statusCode
            return this
        }
    }

    const addGameStub = new AddGameStub()
    const platformProtocol = new PlatformProtocolStub()
    const gameUseCaseStub = new CreateGameUseCase(addGameStub, platformProtocol)
    const httpResponseStub = new HttpResponseStub()
    const sut = new CreateGameController(gameUseCaseStub)

    return { addGameStub, gameUseCaseStub, httpResponseStub, sut, platformProtocol }
}

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
