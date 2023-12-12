import { BaseError } from '@/domain/bases/Error'

export class GameMissingParameterError extends BaseError {
    constructor(paramName) {
        super(400, `Missing parameter: ${paramName}`)
        this.name = 'GameMissingParameterError'
    }
}
