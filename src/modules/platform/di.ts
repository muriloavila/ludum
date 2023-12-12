import { Container } from 'typedi'
import { PrismaPlatformRepository } from '@/data/repositories/prisma/PrismaPlatformRepository'
import { CreatePlatformController } from './presentation/CreatePlatformController'
import { CreatePlatformUseCase } from './features/CreatePlatformUseCase'

Container.set('PlatformRepository', new PrismaPlatformRepository())
Container.set('CreatePlatformUseCase', new CreatePlatformUseCase(Container.get('PlatformRepository')))
Container.set('CreatePlatformController', new CreatePlatformController(Container.get('CreatePlatformUseCase')))
