import crypto from 'crypto'
import { Platform } from "@/domain/entities/Platform"
import { PlatformProtocol } from '@/domain/protocols/PlatformProtocol'
import { PlatformUseCase } from '@/modules/platform/features/PlatformUseCase'
import { PlatformController } from '@/modules/platform/presentation/PlatformController'
import { HttpResponse } from '@/domain/protocols/HttpProtocol'

const makeSut = () => {
    class AddPlatformStub implements PlatformProtocol {
        add(plataform: Platform): Promise<void> { return Promise.resolve() }
    }

    class HttpResponseStub implements HttpResponse {
        statusCode: number;
        body: any;

        constructor() {
            this.statusCode = 200;
            this.body = {};
        }

        json(body: any): HttpResponse {
            this.body = body;
            return this;
        }

        status(statusCode: number): HttpResponse {
            this.statusCode = statusCode;
            return this;
        }
    }


    const addPlatformStub = new AddPlatformStub()
    const platformUseCaseStub = new PlatformUseCase(addPlatformStub)
    const sut = new PlatformController(platformUseCaseStub)
    const httpResponseStub = new HttpResponseStub()

    return { addPlatformStub, platformUseCaseStub, sut, httpResponseStub }
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

        const addSpy = jest.spyOn(addPlatformStub, 'add').mockImplementationOnce(async () => { })

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
        const { sut, platformUseCaseStub, httpResponseStub } = makeSut()

        const useCaseSpy = jest.spyOn(platformUseCaseStub, 'execute')

        sut.handle({ body: mockPlataform }, httpResponseStub)

        expect(useCaseSpy).toHaveBeenCalledTimes(1)
    })

    test('should return a error if controller receive no name', () => {
        const { sut, httpResponseStub } = makeSut()
        const httpResponse = sut.handle({ body: {} }, httpResponseStub)

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toEqual({ error: 'Missing parameter: name' })
    })

    test('should return a error if controller receive no cover', () => {
        const { sut, httpResponseStub } = makeSut()
        const httpResponse = sut.handle({ body: { name: 'Platform' } }, httpResponseStub)

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toEqual({ error: 'Missing parameter: cover' })
    })

    test('should return a error if controller receive no icon', () => {
        const { sut, httpResponseStub } = makeSut()
        const httpResponse = sut.handle({ body: { name: 'Platform', cover: 'http://cover.com' } }, httpResponseStub)

        expect(httpResponse.statusCode).toBe(400)

        expect(httpResponse.body).toEqual({ error: 'Missing parameter: icon' })
    })
})
