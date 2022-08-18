import { conUI } from './canvas.js'
import type { Level } from './Level'
import { IR_X, IR_Y } from './paint.js'

type WalkFunction = (x: number, y: number) => void

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

    _paintInternal(walkFunction: WalkFunction) {
        const rx = 7
        const ry = 8

        for (let y = -ry; y < ry; ++y) {
            for (let x = -rx; x < rx; ++x) {
                const a = ((x + 0.5) ** 2 / rx ** 2) + ((y + 0.5) ** 2 / ry ** 2)
                if (a <= 1) {
                    walkFunction(this.x + x, this.y + y)
                }
            }
        }
    }

    paintInternal() {
        this._paintInternal((x, y) => {
            this.level.setPoint(x, y, this.index)
        })
    }

    paint() {
        conUI.beginPath()
        conUI.arc(IR_X * this.x, IR_Y * this.y, 16, 0, 2 * Math.PI)

        conUI.strokeStyle = '#ff0080'
        conUI.stroke()
    }
}
