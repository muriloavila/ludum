import crypto from 'crypto'
import { Platform } from './Platform'

export interface GameProps {
    uuid?: string
    name: string
    description: string
    cover: string
    platform: Platform
    platformUuid: string
}

export class Game {
    private _uuid: string
    private _name: string
    private _description: string
    private _cover: string
    private _platformUuid: string
    private _platform: Platform

    constructor(props: GameProps) {
        this._uuid = props.uuid ?? crypto.randomUUID()
        this._name = props.name
        this._description = props.description
        this._cover = props.cover
        this._platform = props.platform
        this._platformUuid = props.platformUuid
    }

    get name(): string {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }

    get description(): string {
        return this._description
    }

    set description(description: string) {
        this._description = description
    }

    get cover(): string {
        return this._cover
    }

    set cover(cover: string) {
        this._cover = cover
    }

    get platform(): Platform {
        return this._platform
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

    get platformUuid(): string {
        return this._platformUuid
    }

    set platformUuid(platformUuid: string) {
        this._platformUuid = platformUuid
    }

    toJSON(): object {
        return {
            uuid: this._uuid,
            name: this._name,
            description: this._description,
            cover: this._cover,
            platform: this._platform
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
