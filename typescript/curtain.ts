import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { conUI } from './canvas.js'
import { Settings } from './prelude.js'
import { LevelPhase, state } from './state.js'
import { easeInQuad, easeOutQuad } from './utils.js'

const curtain = new CanvasHandle(document.createElement('canvas'),
    Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT, (con, width, height) => {
        con.fillStyle = '#ff0080'
        con.fillRect(0, 0, width, height)
    }).canvas

export function paintCurtain(t: number) {
    let width: number

    if (state.levelPhase === LevelPhase.ENTERING) {
        width = easeInQuad((state.phaseProgress + 1 - t) / Settings.curtainDuration) * 0.5 * Settings.displaySize

        _paintCurtain(0.5 * Settings.SCREEN_WIDTH, 0.5 * Settings.SCREEN_HEIGHT, -width, width)
    }

    else if (state.levelPhase === LevelPhase.WINNING) {
        width = easeOutQuad((state.phaseProgress - 1 + t) / Settings.curtainDuration) * 0.5 * Settings.displaySize

        _paintCurtain(0, Settings.SCREEN_HEIGHT, width)
        _paintCurtain(Settings.SCREEN_WIDTH, 0, -width)
    }
}

export function _paintCurtain(x: number, y: number, width: number, start = 0) {
    conUI.save()

    conUI.translate(x, y)
    conUI.rotate(-0.5124) // Math.atan2(-540, 960)

    conUI.beginPath()
    conUI.lineTo(start, -500)
    conUI.lineTo(width, -500)
    conUI.lineTo(width, 1000)
    conUI.lineTo(start, 1000)
    conUI.closePath()

    conUI.restore()

    conUI.save()

    conUI.clip()

    conUI.drawImage(curtain, 0, 0, curtain.width, curtain.height,
        0, 0, Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT)

    conUI.restore()
}
