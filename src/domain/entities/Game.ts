import crypto from 'crypto'
import { Platform } from './Platform'

export interface GameProps {
    uuid?: string
    name: string
    description: string
    cover: string
    platform: Platform
}

export class Game {
    private _uuid: string
    private _name: string
    private _description: string
    private _cover: string
    private _platform: Platform

    constructor(props: GameProps) {
        this._uuid = props.uuid ?? crypto.randomUUID()
        this._name = props.name
        this._description = props.description
        this._cover = props.cover
        this._platform = props.platform
    }

    get name(): string {
        return this._name
    }

    get description(): string {
        return this._description
    }

    get cover(): string {
        return this._cover
    }

    get platform(): Platform {
        return this._platform
    }

    set name(name: string) {
        this._name = name
    }

    set description(description: string) {
        this._description = description
    }

    set cover(cover: string) {
        this._cover = cover
    }

    set platform(platform: Platform) {
        this._platform = platform
    }

    get uuid(): string {
        return this._uuid
    }

    set uuid(uuid: string) {
        this._uuid = uuid
    }

    toJSON(): object {
        return {
            uuid: this._uuid,
            name: this._name,
            description: this._description,
            cover: this._cover,
            platform: this._platform.toJSON()
        }
    }

    toPersist(): object {
        return {
            uuid: this._uuid,
            name: this._name,
            description: this._description,
            cover: this._cover,
            platformUuid: this._platform.uuid
        }
    }
}