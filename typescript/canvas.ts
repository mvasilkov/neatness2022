import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { IR_SCREEN_HEIGHT, IR_SCREEN_WIDTH } from './paint.js'

export const SCREEN_WIDTH = 960
export const SCREEN_HEIGHT = 540
const UPSCALE_FROM_IR = 2

/** Low resolution canvas for painting */
export const canvasPaint = new CanvasHandle(document.querySelector('#p')!,
    UPSCALE_FROM_IR * IR_SCREEN_WIDTH, UPSCALE_FROM_IR * IR_SCREEN_HEIGHT)
export const conPaint = canvasPaint.con
conPaint.scale(UPSCALE_FROM_IR, UPSCALE_FROM_IR)

export const canvasUI = new CanvasHandle(document.querySelector('#u')!,
    SCREEN_WIDTH, SCREEN_HEIGHT)
export const conUI = canvasUI.con
