import { Container } from 'typedi'
import { PrismaPlatformRepository } from '@/data/repositories/prisma/PrismaPlatformRepository'
import { CreatePlatformController } from './presentation/create/CreatePlatformController'
import { CreatePlatformUseCase } from './features/create/CreatePlatformUseCase'

Container.set('PlatformRepository', new PrismaPlatformRepository())
Container.set('CreatePlatformUseCase', new CreatePlatformUseCase(new PrismaPlatformRepository()))
Container.set('CreatePlatformController', new CreatePlatformController(Container.get('CreatePlatformUseCase')))
