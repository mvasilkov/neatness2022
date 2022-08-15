import type { Level } from './level'

export class Hotspot {
    readonly level: Level
    readonly x: number
    readonly y: number
    readonly index: number
    readonly isExit: boolean

    constructor(level: Level, x: number, y: number, index: number, isExit: boolean) {
        this.level = level
        this.x = x
        this.y = y
        this.index = index
        this.isExit = isExit
    }
}
