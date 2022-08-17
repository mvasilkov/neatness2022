import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { astar } from './astar.js'
import { SCREEN_HEIGHT, SCREEN_WIDTH, UPSCALE_FROM_IR } from './canvas.js'
import type { Hotspot } from './Hotspot'
import { IR_SCREEN_HEIGHT, IR_SCREEN_WIDTH, painting } from './paint.js'

export function produceFailureScreen(a: Hotspot, b: Hotspot): HTMLCanvasElement {
    const path = new CanvasHandle(document.createElement('canvas'), UPSCALE_FROM_IR * IR_SCREEN_WIDTH, UPSCALE_FROM_IR * IR_SCREEN_HEIGHT, function (con) {
        con.scale(UPSCALE_FROM_IR, UPSCALE_FROM_IR)

        con.fillStyle = '#ff0040'
        paintPath(con, a, b)

        // Copy of Hotspot.paintInternal()
        const rx = 7
        const ry = 8

        for (let y = -ry; y < ry; ++y) {
            for (let x = -rx; x < rx; ++x) {
                const t = ((x + 0.5) ** 2 / rx ** 2) + ((y + 0.5) ** 2 / ry ** 2)
                if (t <= 1) {
                    con.fillRect(a.x + x, a.y + y, 1, 1)
                    con.fillRect(b.x + x, b.y + y, 1, 1)
                }
            }
        }
    })
    const result = new CanvasHandle(document.createElement('canvas'), SCREEN_WIDTH, SCREEN_HEIGHT, function (con) {
        con.fillStyle = '#000'
        con.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

        con.drawImage(path.canvas,
            0, 0, path.canvas.width, path.canvas.height,
            0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
    })
    return result.canvas
}

/** Paint a path from a to b. */
export function paintPath(con: CanvasRenderingContext2D, a: Hotspot, b: Hotspot) {
    astar(painting, IR_SCREEN_WIDTH, IR_SCREEN_HEIGHT, a.x, a.y, b.x, b.y, function (x, y) {
        con.fillRect(x, y, 1, 1)
    })
}
