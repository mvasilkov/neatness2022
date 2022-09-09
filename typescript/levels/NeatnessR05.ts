/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { tiles, width, xs, ys } from '../bitmaps/NeatnessR05.js'
import { Level } from '../Level.js'
import { Settings } from '../prelude.js'

export class NeatnessR05 extends Level {
    constructor() {
        super()

        this.reflect = true

        this.addHotspot(xs[0], ys[0], false)
        this.addHotspot(xs[1], ys[1], false)
        this.addHotspot(xs[2], ys[2], true)
        // Reflection
        this.addHotspot(Settings.IR_SCREEN_WIDTH - xs[0], ys[0], false)
        this.addHotspot(Settings.IR_SCREEN_WIDTH - xs[1], ys[1], true)
        this.addHotspot(Settings.IR_SCREEN_WIDTH - xs[2], ys[2], true)
    }

    override paintInternal() {
        this.paintInternalTiles2(tiles, width)
    }
}
