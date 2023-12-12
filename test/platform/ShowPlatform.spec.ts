import { makeSut, mockPlatform } from '../stubs/PlatformStub'
import { Platform } from '@/domain/entities/Platform'
import crypto from 'crypto'

describe('ShowPlatformUseCase', () => {
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
