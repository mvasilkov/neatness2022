import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { IR_SCREEN_HEIGHT, IR_SCREEN_WIDTH } from './paint.js'

export const SCREEN_WIDTH = 960
export const SCREEN_HEIGHT = 540
export const UPSCALE_FROM_IR = 2

/** Low resolution canvas for painting */
export const canvasPaint = new CanvasHandle(document.querySelector('#p')!,
    UPSCALE_FROM_IR * IR_SCREEN_WIDTH, UPSCALE_FROM_IR * IR_SCREEN_HEIGHT)
export const conPaint = canvasPaint.con
conPaint.scale(UPSCALE_FROM_IR, UPSCALE_FROM_IR)

export const canvasUI = new CanvasHandle(document.querySelector('#u')!,
    SCREEN_WIDTH, SCREEN_HEIGHT)
export const conUI = canvasUI.con

export function setFontStyle(con: CanvasRenderingContext2D, style: string) {
    con.font = style + `px -apple-system, 'Segoe UI', 'DejaVu Sans', system-ui, sans-serif`
}

export function paintTextBlob(con: CanvasRenderingContext2D, x: number, y: number, size: number, style: string, text: string) {
    setFontStyle(con, style)
    con.textAlign = 'center'
    con.textBaseline = 'middle'
    const textMetrics = con.measureText(text)

    const left = -(textMetrics.actualBoundingBoxLeft || 0.5 * textMetrics.width)
    const up = -(textMetrics.actualBoundingBoxAscent || 0.5 * size)
    const right = textMetrics.actualBoundingBoxRight || 0.5 * textMetrics.width
    const down = textMetrics.actualBoundingBoxDescent || 0.5 * size

    const borderRadius = 16
    const padding = 16
    const backgroundColor = '#80808080'
    const color = '#ff0040'

    con.beginPath()
    // Left side
    con.lineTo(x + left - padding, y + down + padding - borderRadius)
    con.lineTo(x + left - padding, y + up - padding + borderRadius)
    // Top side
    con.quadraticCurveTo(x + left - padding, y + up - padding, x + left - padding + borderRadius, y + up - padding)
    con.lineTo(x + right + padding - borderRadius, y + up - padding)
    // Right side
    con.quadraticCurveTo(x + right + padding, y + up - padding, x + right + padding, y + up - padding + borderRadius)
    con.lineTo(x + right + padding, y + down + padding - borderRadius)
    // Bottom side
    con.quadraticCurveTo(x + right + padding, y + down + padding, x + right + padding - borderRadius, y + down + padding)
    con.lineTo(x + left - padding + borderRadius, y + down + padding)
    // Close the loop
    con.quadraticCurveTo(x + left - padding, y + down + padding, x + left - padding, y + down + padding - borderRadius)

    con.fillStyle = backgroundColor
    con.fill()

    con.fillStyle = color
    con.fillText(text, x, y)
}
