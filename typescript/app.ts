import { canvasPaint, conPaint } from './canvas.js'
import { IR_SCREEN_HEIGHT, IR_SCREEN_WIDTH, IR_X, IR_Y, Painter } from './paint.js'

const pointer = new Painter(canvasPaint.canvas, paintLine)
pointer.addEventListeners(document)

//#region Line painting function

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

    conPaint.fillStyle = '#ff0080'
    conPaint.fillRect((x0 | 0), (y0 | 0), 1, 1)
}

//#endregion

function clearPaintCanvas() {
    conPaint.fillStyle = '#000'
    conPaint.fillRect(0, 0, IR_SCREEN_WIDTH, IR_SCREEN_HEIGHT)
}

clearPaintCanvas()
