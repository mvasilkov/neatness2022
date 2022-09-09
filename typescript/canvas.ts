/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { Settings } from './prelude.js'

export const canvasPaint = new CanvasHandle(document.querySelector('#p')!,
    Settings.UPSCALE_FROM_IR * Settings.IR_SCREEN_WIDTH,
    Settings.UPSCALE_FROM_IR * Settings.IR_SCREEN_HEIGHT,
    con => con.scale(Settings.UPSCALE_FROM_IR, Settings.UPSCALE_FROM_IR))

export const conPaint = canvasPaint.con

export const canvasUI = new CanvasHandle(document.querySelector('#u')!,
    Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT)

export const conUI = canvasUI.con

export function setFontStyle(con: CanvasRenderingContext2D, style: string) {
    con.font = style + `px -apple-system, 'Segoe UI', 'DejaVu Sans', system-ui, sans-serif`
}

// Work in progress
export function paintTextBlob(con: CanvasRenderingContext2D, x: number, y: number, size: number, style: string, color: string, text: string, backgroundColor = '#000000a0') {
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
