import { Platform } from '@/domain/entities/Platform'
import { makeSut, mockPlatform } from '../stubs/PlatformStub'

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
})
