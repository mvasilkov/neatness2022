import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { astar } from './astar.js'
import { paintTextBlob, SCREEN_HEIGHT, SCREEN_WIDTH, UPSCALE_FROM_IR } from './canvas.js'
import type { Hotspot } from './Hotspot'
import { IR_SCREEN_HEIGHT, IR_SCREEN_WIDTH, painting } from './paint.js'

export function produceFailureScreen(a: Hotspot, b: Hotspot): HTMLCanvasElement {
    const path = new CanvasHandle(document.createElement('canvas'), UPSCALE_FROM_IR * IR_SCREEN_WIDTH, UPSCALE_FROM_IR * IR_SCREEN_HEIGHT, function (con) {
        con.scale(UPSCALE_FROM_IR, UPSCALE_FROM_IR)

        con.fillStyle = '#ff0040'
        paintPath(con, a, b)

        const Δx = b.x - a.x
        const Δy = b.y - a.y

        a._paintInternal((x, y) => {
            con.fillRect(x, y, 1, 1)
            con.fillRect(x + Δx, y + Δy, 1, 1)
        })
    })
    const result = new CanvasHandle(document.createElement('canvas'), SCREEN_WIDTH, SCREEN_HEIGHT, function (con) {
        con.fillStyle = '#000'
        con.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

        con.drawImage(path.canvas,
            0, 0, path.canvas.width, path.canvas.height,
            0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

        paintTextBlob(con, 0.5 * SCREEN_WIDTH, 0.5 * SCREEN_HEIGHT, 48, 'bold 48', 'Wrong. Again.')
    })
    return result.canvas
}

/** Paint a path from a to b. */
export function paintPath(con: CanvasRenderingContext2D, a: Hotspot, b: Hotspot) {
    astar(painting, IR_SCREEN_WIDTH, IR_SCREEN_HEIGHT, a.x, a.y, b.x, b.y, function (x, y) {
        con.fillRect(x, y, 1, 1)
    })
}
