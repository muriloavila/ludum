import { PrismaPlatformRepository } from "@/data/repositories/prisma/PrismaPlatformRepository";
import { Container } from "typedi";
import { PlatformController } from "./presentation/PlatformController";
import { PlatformUseCase } from "./features/PlatformUseCase";

Container.set('PlatformRepository', new PrismaPlatformRepository())
Container.set('PlatformUseCase', new PlatformUseCase(new PrismaPlatformRepository()))
Container.set('PlatformController', new PlatformController(Container.get('PlatformUseCase')))