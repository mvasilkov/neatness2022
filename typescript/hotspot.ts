import { conUI } from './canvas.js'
import type { Level } from './level'
import { IR_X, IR_Y } from './paint.js'

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

    paintInternal() {
        const rx = 7
        const ry = 8

        for (let y = -ry; y < ry; ++y) {
            for (let x = -rx; x < rx; ++x) {
                const a = ((x + 0.5) ** 2 / rx ** 2) + ((y + 0.5) ** 2 / ry ** 2)
                if (a <= 1) {
                    this.level.setPoint(this.x + x, this.y + y, this.index)
                }
            }
        }
    }

    paint() {
        conUI.strokeStyle = '#ff0080'
        conUI.beginPath()
        conUI.arc(IR_X * this.x, IR_Y * this.y, 16, 0, 2 * Math.PI)
        conUI.stroke()
    }
}
