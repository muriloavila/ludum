import { Game } from './Game'
import crypto from 'crypto'

export interface GuideChapterProps {
    uuid?: string
    name: string
    url: string
    isCompleted: boolean
    gameUuid: string
    game: Game
}

export class GuideChapter {
    private _uuid: string
    private _name: string
    private _url: string
    private _isCompleted: boolean
    private _gameUuid: string
    private _game: Game

    constructor(props: GuideChapterProps) {
        this._uuid = props.uuid ?? crypto.randomUUID()
        this._name = props.name
        this._url = props.url
        this._isCompleted = props.isCompleted ?? false
        this._gameUuid = props.gameUuid
        this._game = props.game
    }

    get uuid(): string {
        return this._uuid
    }

    set uuid(uuid: string) {
        this._uuid = uuid
    }

    get name(): string {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }

    get url(): string {
        return this._url
    }

    set url(url: string) {
        this._url = url
    }

    get isCompleted(): boolean {
        return this._isCompleted
    }

    set isCompleted(isCompleted: boolean) {
        this._isCompleted = isCompleted
    }

    get gameUuid(): string {
        return this._gameUuid
    }

    set gameUuid(gameUuid: string) {
        this._gameUuid = gameUuid
    }

    get game(): Game {
        return this._game
    }

    set game(game: Game) {
        this._game = game
    }

    toJSON(): object {
        return {
            uuid: this.uuid,
            name: this.name,
            url: this.url,
            isCompleted: this.isCompleted,
            gameUuid: this.gameUuid
        }
    }

    toPersist(): object {
        return {
            uuid: this.uuid,
            name: this.name,
            url: this.url,
            isCompleted: this.isCompleted,
            gameUuid: this.gameUuid
        }
    }
}
