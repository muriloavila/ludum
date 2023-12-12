import { PrismaGameRepository } from '@/data/repositories/prisma/PrismaGameRepository'
import Container from 'typedi'
import { CreateGameUseCase } from './features/CreateGameUseCase'
import { CreateGameController } from './presentation/CreateGameController'

Container.set('GameRepository', new PrismaGameRepository())
Container.set('CreateGameUseCase', new CreateGameUseCase(Container.get('GameRepository'), Container.get('PlatformRepository')))
Container.set('CreateGameController', new CreateGameController(Container.get('CreateGameUseCase')))
