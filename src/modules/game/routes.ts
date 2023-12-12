import { Router } from 'express'
import { CreateGameController } from './presentation/CreateGameController'
import Container from 'typedi'

const gameRouter = (): Router => {
    const router = Router()

    const CreateGameController: CreateGameController = Container.get('CreateGameController')

    router.post('/game', CreateGameController.handle.bind(CreateGameController))
    return router
}

export default gameRouter
