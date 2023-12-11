import { Router } from "express";
import Container from "typedi";
import { PlatformController } from "./presentation/PlatformController";

const platformRouter = () => {
    const router = Router();
    const platformController: PlatformController = Container.get('PlatformController')

    router.post('/platform', platformController.handle.bind(platformController))
    return router
}

export default platformRouter