/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { tiles, width, xs, ys } from '../bitmaps/NeatnessM02.js'
import { Level } from '../Level.js'
import { state } from '../state.js'

export class NeatnessM02 extends Level {
    constructor() {
        super()

        this.buttonsEnabled = state.completedLevels[4] ? 3 : 2

        this.addHotspot(xs[0], ys[0], false)
        this.addHotspot(xs[1], ys[1], false)
        this.addHotspot(xs[2], ys[2], true)
        this.addHotspot(xs[3], ys[3], true)
    }

    override paintInternal() {
        this.paintInternalTiles2(tiles, width)
    }
}
