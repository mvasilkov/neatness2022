/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { astar } from './astar.js'
import { conPaint, conUI, paintTextBlob } from './canvas.js'
import { Colors } from './colors/colors.js'
import { Hotspot } from './Hotspot.js'
import { painting, Settings } from './prelude.js'
import { princess, princessSkull } from './sprites.js'
import { state } from './state.js'
import { easeInOutQuad, easeOutQuad } from './utils.js'

export function produceRestartMessage(a: Hotspot, b: Hotspot, coil = false): HTMLCanvasElement {
    const path = new CanvasHandle(null, Settings.UPSCALE_FROM_IR * Settings.IR_SCREEN_WIDTH, Settings.UPSCALE_FROM_IR * Settings.IR_SCREEN_HEIGHT, Settings.SUPERSAMPLING, function (con) {
        con.scale(Settings.UPSCALE_FROM_IR, Settings.UPSCALE_FROM_IR)

        con.fillStyle = '#ff0040'
        // Paint a path from a to b.
        astar(painting, Settings.IR_SCREEN_WIDTH, Settings.IR_SCREEN_HEIGHT, a.x, a.y, b.x, b.y, function (x, y) {
            con.fillRect(x, y, 1, 1)
        })

        const Δx = b.x - a.x
        const Δy = b.y - a.y
        // Don't paint inside the end points.
        a._paintInternal((x, y) => {
            con.clearRect(x, y, 1, 1)
            con.clearRect(x + Δx, y + Δy, 1, 1)
        })
    }).canvas

    return new CanvasHandle(null, Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT, Settings.SUPERSAMPLING, function (con) {
        con.drawImage(path,
            0, 0, path.width, path.height,
            0, 0, Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT)

        paintTextBlob(con,
            0.5 * Settings.SCREEN_WIDTH,
            0.5 * Settings.SCREEN_HEIGHT,
            64, 'bold 64', '#ff0040', coil ? 'Requires Coil Membership' : 'Not like this')
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

export function paintEnding(opacity: number) {
    // Princess: 17 by 14, padding 2
    const width = Settings.TILE_WIDTH * (17 + 4)
    const height = Settings.TILE_HEIGHT * (14 + 4)
    const x0 = 0.5 * (Settings.IR_SCREEN_WIDTH - width) | 0
    const y0 = 0.5 * (Settings.IR_SCREEN_HEIGHT - height) | 0

    conPaint.fillStyle = '#7b8382'
    conPaint.fillRect(x0, y0, width, height)

    conPaint.drawImage(princess,
        0, 0, princess.width, princess.height,
        2 * Settings.TILE_WIDTH + x0, 2 * Settings.TILE_HEIGHT + y0,
        17 * Settings.TILE_WIDTH, 14 * Settings.TILE_HEIGHT)

    conPaint.globalAlpha = 1 - easeInOutQuad(opacity)

    conPaint.fillStyle = Colors.tile
    conPaint.fillRect(x0, y0, width, height)

    conPaint.drawImage(princessSkull,
        0, 0, princessSkull.width, princessSkull.height,
        7 * Settings.TILE_WIDTH + x0, 2 * Settings.TILE_HEIGHT + y0,
        11 * Settings.TILE_WIDTH, 14 * Settings.TILE_HEIGHT)

    conPaint.globalAlpha = 1
}
