import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { IR_SCREEN_HEIGHT, IR_SCREEN_WIDTH } from './paint.js'

const UPSCALE_FROM_IR = 2

const canvasPaint = new CanvasHandle(document.querySelector('#p')!,
    UPSCALE_FROM_IR * IR_SCREEN_WIDTH, UPSCALE_FROM_IR * IR_SCREEN_HEIGHT)
const conPaint = canvasPaint.con
conPaint.scale(UPSCALE_FROM_IR, UPSCALE_FROM_IR)

function clearPaintCanvas() {
    conPaint.fillStyle = '#000'
    conPaint.fillRect(0, 0, IR_SCREEN_WIDTH, IR_SCREEN_HEIGHT)
}

clearPaintCanvas()
