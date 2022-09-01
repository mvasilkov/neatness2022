import { conPaint, conUI } from './canvas.js'
import type { Level } from './Level'
import { Settings } from './prelude.js'
import { grave, skulls } from './sprites.js'

const enum SkullFacing { LEFT, FRONT, RIGHT }

type WalkFunction = (x: number, y: number) => void

export class Hotspot {
    readonly level: Level
    readonly x: number
    readonly y: number
    readonly index: number
    readonly isExit: boolean
    /** https://youtu.be/szCuvbdQsSI */
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

    turn() {
        // Toggle between 0 and 2
        this.orientation = (this.orientation + 2) % 4
        this.turningProgress = Settings.skullTurnDuration
    }

    update() {
        if (this.turningProgress > 0) {
            --this.turningProgress
        }
    }

    _paintInternal(walkFunction: WalkFunction) {
        const rx = Settings.hotspotRx
        const ry = Settings.hotspotRy

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
        // Outline
        conPaint.fillStyle = '#202020'
        this._paintInternal((x, y) => {
            conPaint.fillRect(x - 0.5, y - 0.5, 2, 2)
        })
        this._paintInternal((x, y) => {
            this.level.setPoint(x, y, this.index)
        })
    }

    paint() {
        const sprite = this.isExit ? grave :
            skulls[this.turningProgress > 0 ? SkullFacing.FRONT : this.orientation]

        conUI.drawImage(sprite,
            0, 0, sprite.width, sprite.height,
            Settings.IR_X * this.x - 0.5 * Settings.hotspotSpriteSize,
            Settings.IR_Y * this.y - 0.5 * Settings.hotspotSpriteSize,
            Settings.hotspotSpriteSize, Settings.hotspotSpriteSize)
    }
}
