import crypto from 'crypto'

export interface PlatformProps {
    uuid?: string
    name: string
    cover: string
    icon: string
}

export class Platform {
    private _uuid: string
    private _name: string
    private _cover: string
    private _icon: string

    constructor(props: PlatformProps) {
        this._uuid = props.uuid ?? crypto.randomUUID()
        this._name = props.name
        this._cover = props.cover
        this._icon = props.icon
    }

    get name(): string {
        return this._name
    }

    get cover(): string {
        return this._cover
    }

    get icon(): string {
        return this._icon
    }

    set name(name: string) {
        this._name = name
    }

    set cover(cover: string) {
        this._cover = cover
    }

    set icon(icon: string) {
        this._icon = icon
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
            cover: this._cover,
            icon: this._icon
        }
    }
}
