import { Router } from 'express'
import Container from 'typedi'
import { CreatePlatformController } from './presentation/create/CreatePlatformController'

const platformRouter = (): Router => {
    const router = Router()
    const createPlatformController: CreatePlatformController = Container.get('CreatePlatformController')

    router.post('/platform', createPlatformController.handle.bind(createPlatformController))
    return router
}

export default platformRouter
