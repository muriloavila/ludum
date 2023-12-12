import { Platform } from '@/domain/entities/Platform'
import { PlatformProtocol } from '@/domain/protocols/PlatformProtocol'
import { CreatePlatformUseCase } from '@/modules/platform/features/CreatePlatformUseCase'
import { ShowPlatformUseCase } from '@/modules/platform/features/ShowPlatformUseCase'
import { CreatePlatformController } from '@/modules/platform/presentation/CreatePlatformController'
import crypto from 'crypto'
import { HttpResponseStub } from './Stubs'

const mockPlatform = {
    uuid: crypto.randomUUID(),
    name: 'Platform',
    cover: 'http://cover.com',
    icon: 'http://icon.com'
}

const makeSut = (): any => {
    class PlatformProtocolStub implements PlatformProtocol {
        async add(platform: Platform): Promise<void> { await Promise.resolve() }
        async findByUuid(uuid: string): Promise<Platform> { return await Promise.resolve(new Platform(mockPlatform)) }
    }

    const platformProtocolStub = new PlatformProtocolStub()
    const createPlatformUseCaseStub = new CreatePlatformUseCase(platformProtocolStub)
    const showPlatformUseCaseStub = new ShowPlatformUseCase(platformProtocolStub)
    const sut = new CreatePlatformController(createPlatformUseCaseStub)
    const httpResponseStub = new HttpResponseStub()

    return { platformProtocolStub, createPlatformUseCaseStub, sut, httpResponseStub, showPlatformUseCaseStub }
}

export { makeSut, mockPlatform }
