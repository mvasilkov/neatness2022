import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { astar } from './astar.js'
import { conUI, paintTextBlob } from './canvas.js'
import { Hotspot } from './Hotspot.js'
import { painting, Settings } from './prelude.js'
import { state } from './state.js'
import { easeOutQuad } from './utils.js'

export function produceRestartMessage(a: Hotspot, b: Hotspot): HTMLCanvasElement {
    const path = new CanvasHandle(document.createElement('canvas'), Settings.UPSCALE_FROM_IR * Settings.IR_SCREEN_WIDTH, Settings.UPSCALE_FROM_IR * Settings.IR_SCREEN_HEIGHT, function (con) {
        con.scale(Settings.UPSCALE_FROM_IR, Settings.UPSCALE_FROM_IR)

        con.fillStyle = '#ff0040'
        paintPath(con, a, b)

        const Δx = b.x - a.x
        const Δy = b.y - a.y

        a._paintInternal((x, y) => {
            con.clearRect(x, y, 1, 1)
            con.clearRect(x + Δx, y + Δy, 1, 1)
        })
    }).canvas

    return new CanvasHandle(document.createElement('canvas'), Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT, function (con) {
        con.drawImage(path,
            0, 0, path.width, path.height,
            0, 0, Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT)

        paintTextBlob(con,
            0.5 * Settings.SCREEN_WIDTH,
            0.5 * Settings.SCREEN_HEIGHT,
            64, 'bold 64', '#ff0040', 'Not like this')
    }).canvas
}

export function paintRestartMessage(opacity: number) {
    const r = state.restartMessage
    if (!r) return

    // Ease out because we're going in the opposite direction (1 ⏩ 0).
    conUI.globalAlpha = easeOutQuad(opacity)

    conUI.drawImage(r,
        0, 0, r.width, r.height,
        0, 0, Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT)

    conUI.globalAlpha = 1
}

/** Paint a path from a to b. */
export function paintPath(con: CanvasRenderingContext2D, a: Hotspot, b: Hotspot) {
    astar(painting, Settings.IR_SCREEN_WIDTH, Settings.IR_SCREEN_HEIGHT, a.x, a.y, b.x, b.y, function (x, y) {
        con.fillRect(x, y, 1, 1)
    })
}
