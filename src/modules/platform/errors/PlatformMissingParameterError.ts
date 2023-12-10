import { BaseError } from "@/domain/bases/Error"

export class PlatformMissingParameterError extends BaseError {
    constructor(paramName) {
        super(400, `Missing parameter: ${paramName}`)
        this.name = 'PlatformMissingParameterError'
    }
}