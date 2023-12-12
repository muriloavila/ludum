import { BaseError } from '@/domain/bases/Error'

export class PlatformNotFoundError extends BaseError {
    constructor() {
        super(400, 'Platform not found')
        this.name = 'PlatformNotFoundError'
    }
}
