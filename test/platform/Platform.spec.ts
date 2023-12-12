import crypto from 'crypto'
import { Platform } from '@/domain/entities/Platform'
import { PlatformProtocol } from '@/domain/protocols/PlatformProtocol'
import { CreatePlatformUseCase } from '@/modules/platform/features/CreatePlatformUseCase'
import { CreatePlatformController } from '@/modules/platform/presentation/CreatePlatformController'
import { HttpResponse } from '@/domain/protocols/HttpProtocol'
import { ShowPlatformUseCase } from '@/modules/platform/features/ShowPlatformUseCase'

const makeSut = (): any => {
    class PlatformProtocolStub implements PlatformProtocol {
        async add(platform: Platform): Promise<void> { await Promise.resolve() }
        async findByUuid(uuid: string): Promise<Platform> { return await Promise.resolve(new Platform(mockPlatform)) }
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

    const platformProtocolStub = new PlatformProtocolStub()
    const createPlatformUseCaseStub = new CreatePlatformUseCase(platformProtocolStub)
    const showPlatformUseCaseStub = new ShowPlatformUseCase(platformProtocolStub)
    const sut = new CreatePlatformController(createPlatformUseCaseStub)
    const httpResponseStub = new HttpResponseStub()

    return { platformProtocolStub, createPlatformUseCaseStub, sut, httpResponseStub, showPlatformUseCaseStub }
}

const mockPlatform = {
    uuid: crypto.randomUUID(),
    name: 'Platform',
    cover: 'http://cover.com',
    icon: 'http://icon.com'
}

describe('PlatformUseCase', () => {
    test('should create a platform', () => {
        const platform = new Platform(mockPlatform)

        expect(platform.name).toBe('Platform')
    })

    test('should create a platform with uuid', () => {
        const platform = new Platform(mockPlatform)

        expect(platform.uuid).toBeDefined()
    })

    test('should call add function with correct values', async () => {
        const { platformProtocolStub } = makeSut()
        const platform = new Platform(mockPlatform)

        const addSpy = jest.spyOn(platformProtocolStub, 'add').mockImplementationOnce(async () => { })

        await platformProtocolStub.add(platform)

        expect(addSpy).toHaveBeenCalledWith(platform)
    })

    test('should call useCase with correct values', async () => {
        const { platformProtocolStub, createPlatformUseCaseStub } = makeSut()
        const platform = new Platform(mockPlatform)

        const addSpy = jest.spyOn(platformProtocolStub, 'add')
        const useCaseSpy = jest.spyOn(createPlatformUseCaseStub, 'execute')

        await createPlatformUseCaseStub.execute(platform)

        expect(addSpy).toHaveBeenCalledWith(platform)
        expect(useCaseSpy).toHaveBeenCalledWith(platform)
    })

    test('should call controller with correct values', async () => {
        const { sut, createPlatformUseCaseStub, httpResponseStub } = makeSut()

        const useCaseSpy = jest.spyOn(createPlatformUseCaseStub, 'execute')

        await sut.handle({ body: mockPlatform }, httpResponseStub)

        expect(useCaseSpy).toHaveBeenCalledTimes(1)
    })

    test('should return a error if controller receive no name', async () => {
        const { sut, httpResponseStub } = makeSut()
        const httpResponse = await sut.handle({ body: {} }, httpResponseStub)

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toEqual({ error: 'Missing parameter: name' })
    })

    test('should return a error if controller receive no cover', async () => {
        const { sut, httpResponseStub } = makeSut()
        const httpResponse = await sut.handle({ body: { name: 'Platform' } }, httpResponseStub)

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toEqual({ error: 'Missing parameter: cover' })
    })

    test('should return a error if controller receive no icon', async () => {
        const { sut, httpResponseStub } = makeSut()
        const httpResponse = await sut.handle({ body: { name: 'Platform', cover: 'http://cover.com' } }, httpResponseStub)

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toEqual({ error: 'Missing parameter: icon' })
    })

    test('should return a error if platform not exists', async () => {
        const { platformProtocolStub, showPlatformUseCaseStub } = makeSut()

        const findSpy = jest.spyOn(platformProtocolStub, 'findByUuid').mockImplementationOnce(async () => { })
        const useCaseSpy = jest.spyOn(showPlatformUseCaseStub, 'execute')

        showPlatformUseCaseStub.execute({ uuid: crypto.randomUUID() }).catch((error) => {
            expect(error).toEqual(new Error('Platform not found'))
        })

        expect(findSpy).toHaveBeenCalledTimes(1)
        expect(useCaseSpy).toHaveBeenCalledTimes(1)
    })

    test('should return true if platform exists', async () => {
        const { platformProtocolStub, showPlatformUseCaseStub } = makeSut()

        const findSpy = jest.spyOn(platformProtocolStub, 'findByUuid')
        const useCaseSpy = jest.spyOn(showPlatformUseCaseStub, 'execute')

        const platform = showPlatformUseCaseStub.execute({ uuid: mockPlatform.uuid })

        expect(findSpy).toHaveBeenCalledTimes(1)
        expect(useCaseSpy).toHaveBeenCalledTimes(1)
        await expect(platform).resolves.toEqual(new Platform(mockPlatform))
    })
})
