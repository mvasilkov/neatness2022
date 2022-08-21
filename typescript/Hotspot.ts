import { conUI } from './canvas.js'
import type { Level } from './Level'
import { IR_X, IR_Y } from './paint.js'
import { graves, skulls } from './sprites.js'

type WalkFunction = (x: number, y: number) => void

const enum SkullFacing { LEFT, FRONT, RIGHT }

const SPRITE_SIZE = 22
export const SKULL_TURN_DURATION = 9

export class Hotspot {
    readonly level: Level
    readonly x: number
    readonly y: number
    readonly index: number
    readonly isExit: boolean
    isSatisfied: boolean
    orientation: SkullFacing
    turningProgress: number

    constructor(level: Level, x: number, y: number, index: number, isExit: boolean) {
        this.level = level
        this.x = x
        this.y = y
        this.index = index
        this.isExit = isExit
        this.isSatisfied = false
        this.orientation = Math.random() < 0.5 ? SkullFacing.LEFT : SkullFacing.RIGHT
        this.turningProgress = 0
    }

    update() {
        if (this.turningProgress > 0) {
            --this.turningProgress
        }
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
        const sprite = this.isExit ? graves[0] : skulls[this.turningProgress > 0 ? SkullFacing.FRONT : this.orientation]

        conUI.drawImage(sprite,
            0, 0, sprite.width, sprite.height,
            IR_X * this.x - 0.5 * SPRITE_SIZE,
            IR_Y * this.y - 0.5 * SPRITE_SIZE,
            SPRITE_SIZE, SPRITE_SIZE)
    }
}
