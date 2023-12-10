import crypto from 'crypto'
import { Platform } from "@/domain/entities/Platform"
import { PlatformProtocol } from '@/domain/protocols/PlatformProtocol'
import { PlatformUseCase } from '@/modules/platform/features/PlatformUseCase'
import { PlatformController } from '@/modules/platform/presentation/PlatformController'

const makeSut = () => {
    class AddPlatformStub implements PlatformProtocol {
        add(plataform: Platform): void { }
    }

    const addPlatformStub = new AddPlatformStub()
    const platformUseCaseStub = new PlatformUseCase(addPlatformStub)
    const sut = new PlatformController(platformUseCaseStub)

    return { addPlatformStub, platformUseCaseStub, sut }
}

const mockPlataform = {
    uuid: crypto.randomUUID(),
    name: 'Platform',
    cover: 'http://cover.com',
    icon: 'http://icon.com'
}

describe('PlatformUseCase', () => {
    test('should create a plataform', () => {
        const platform = new Platform(mockPlataform)

        expect(platform.name).toBe('Platform')
    })

    test('should create a platform with uuid', () => {
        const platform = new Platform(mockPlataform)

        expect(platform.uuid).toBeDefined()
    })

    test('should call add function with correct values', () => {
        const { addPlatformStub } = makeSut()
        const platform = new Platform(mockPlataform)

        const addSpy = jest.spyOn(addPlatformStub, 'add')

        addPlatformStub.add(platform)

        expect(addSpy).toHaveBeenCalledWith(platform)
    })

    test('should call useCase with correct values', () => {
        const { addPlatformStub, platformUseCaseStub } = makeSut()
        const platform = new Platform(mockPlataform)

        const addSpy = jest.spyOn(addPlatformStub, 'add')
        const useCaseSpy = jest.spyOn(platformUseCaseStub, 'execute')

        platformUseCaseStub.execute(platform)

        expect(addSpy).toHaveBeenCalledWith(platform)
        expect(useCaseSpy).toHaveBeenCalledWith(platform)
    })

    test('should call controller with correct values', () => {
        const { sut, platformUseCaseStub } = makeSut()

        const useCaseSpy = jest.spyOn(platformUseCaseStub, 'execute')

        sut.handle({ body: mockPlataform }, { statusCode: 200, body: {} })

        expect(useCaseSpy).toHaveBeenCalledTimes(1)
    })

    test('should return a error if controller receive no name', () => {
        const { sut, platformUseCaseStub } = makeSut()
        const httpResponse = sut.handle({ body: {} }, { statusCode: 400, body: {} })

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toBe(JSON.stringify({ error: 'Missing parameter: name' }))
    })

    test('should return a error if controller receive no cover', () => {
        const { sut, platformUseCaseStub } = makeSut()
        const httpResponse = sut.handle({ body: { name: 'Platform' } }, { statusCode: 400, body: {} })

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toBe(JSON.stringify({ error: 'Missing parameter: cover' }))
    })

    test('should return a error if controller receive no icon', () => {
        const { sut, platformUseCaseStub } = makeSut()
        const httpResponse = sut.handle({ body: { name: 'Platform', cover: 'http://cover.com' } }, { statusCode: 400, body: {} })

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toBe(JSON.stringify({ error: 'Missing parameter: icon' }))
    })


})
