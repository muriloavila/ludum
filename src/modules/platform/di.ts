import { Container } from 'typedi'
import { PrismaPlatformRepository } from '@/data/repositories/prisma/PrismaPlatformRepository'
import { PlatformController } from './presentation/PlatformController'
import { CreatePlatformUseCase } from './features/create/CreatePlatformUseCase'

Container.set('PlatformRepository', new PrismaPlatformRepository())
Container.set('CreatePlatformUseCase', new CreatePlatformUseCase(new PrismaPlatformRepository()))
Container.set('PlatformController', new PlatformController(Container.get('CreatePlatformUseCase')))
