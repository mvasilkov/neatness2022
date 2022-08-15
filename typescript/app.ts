import { Vec2 } from '../node_modules/natlib/Vec2.js'

import { canvasPaint, conPaint } from './canvas.js'
import { ddaWalk } from './ddaWalk.js'
import { IR_SCREEN_HEIGHT, IR_SCREEN_WIDTH, IR_X, IR_Y, Painter } from './paint.js'

const pointer = new Painter(canvasPaint.canvas, paintLine)
pointer.addEventListeners(document)

//#region Line painting function

const startPoint = new Vec2
const endPoint = new Vec2

function paintLine(x0: number, y0: number, x1: number, y1: number) {
    // Convert to internal resolution
    x0 = (x0 + 0.5) / IR_X
    y0 = (y0 + 0.5) / IR_Y
    x1 = (x1 + 0.5) / IR_X
    y1 = (y1 + 0.5) / IR_Y

    if (x0 < 0 || x0 >= IR_SCREEN_WIDTH ||
        y0 < 0 || y0 >= IR_SCREEN_HEIGHT) {

        return // Out of bounds, do nothing
    }

    const x0trunc = x0 | 0
    const y0trunc = y0 | 0
    const x1trunc = x1 | 0
    const y1trunc = y1 | 0

    conPaint.fillStyle = '#ff0080'
    conPaint.fillRect(x0trunc, y0trunc, 1, 1)

    // Check if it's a single point
    if (x0trunc === x1trunc && y0trunc === y1trunc) return

    startPoint.set(x0, y0)
    const expectedLength = endPoint.set(x1, y1).subtract(startPoint).length()

    ddaWalk(startPoint, endPoint.normalize(), function (x, y, length) {
        if (x < 0 || x >= IR_SCREEN_WIDTH ||
            y < 0 || y >= IR_SCREEN_HEIGHT) {

            return true // Out of bounds, stop
        }

        // Paint the actual line
        conPaint.fillRect(x, y, 1, 1)

        if (x === x1trunc && y === y1trunc) {
            return true // Got to the end, stop
        }

        if (length >= expectedLength) {
            return true // Passed the end point, stop
        }
    })
}

//#endregion

function clearPaintCanvas() {
    conPaint.fillStyle = '#000'
    conPaint.fillRect(0, 0, IR_SCREEN_WIDTH, IR_SCREEN_HEIGHT)
}

clearPaintCanvas()
