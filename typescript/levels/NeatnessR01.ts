/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { tiles, width } from '../bitmaps/NeatnessR01.js'
import { xs } from '../bitmaps/NeatnessR02.js'
import { Level } from '../Level.js'
import { Settings } from '../prelude.js'

export class NeatnessR01 extends Level {
    constructor() {
        super()

        this.reflect = true

        const y = 0.5 * Settings.IR_SCREEN_HEIGHT | 0

        this.addHotspot(xs[0], y, false)
        this.addHotspot(xs[1], y, true)
    }

    override paintInternal() {
        this.paintInternalTiles2(tiles, width, 3, 4)
    }
}
