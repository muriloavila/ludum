import { BaseError } from '@/domain/bases/Error'

export class GameNotFoundError extends BaseError {
    constructor() {
        super(400, 'Game not found')
        this.name = 'GameNotFoundError'
    }
}
