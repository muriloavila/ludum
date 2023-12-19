import crypto from 'crypto'
import { Platform } from '@/domain/entities/Platform'
import { mockPlatform as platform } from '../stubs/PlatformStub'
import { GameProtocol } from '@/domain/protocols/GameProtocol'
import { Game } from '@/domain/entities/Game'
import { PlatformProtocol } from '@/domain/protocols/PlatformProtocol'
import { CreateGameUseCase } from '@/modules/game/features/CreateGameUseCase'
import { HttpResponseStub } from './Stubs'
import { CreateGameController } from '@/modules/game/presentation/CreateGameController'

export const mockPlatform = new Platform(platform)

export const mockGame = {
    uuid: crypto.randomUUID(),
    name: 'Game',
    description: 'Description',
    cover: 'http://cover.com',
    platform: mockPlatform,
    platformUuid: mockPlatform.uuid
}

export const makeSut = (): any => {
    class AddGameStub implements GameProtocol {
        async add(game: Game): Promise<void> { await Promise.resolve() }
    }

    class PlatformProtocolStub implements PlatformProtocol {
        async add(platform: Platform): Promise<void> { await Promise.resolve() }
        async findByUuid(uuid: string): Promise<Platform> { return await Promise.resolve(mockPlatform) }
    }

    const addGameStub = new AddGameStub()
    const platformProtocol = new PlatformProtocolStub()
    const gameUseCaseStub = new CreateGameUseCase(addGameStub, platformProtocol)
    const httpResponseStub = new HttpResponseStub()
    const sut = new CreateGameController(gameUseCaseStub)

    return { addGameStub, gameUseCaseStub, httpResponseStub, sut, platformProtocol }
}
