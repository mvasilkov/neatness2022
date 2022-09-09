/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { tiles, width, xs, ys } from '../bitmaps/Coil02.js'
import { Level } from '../Level.js'

export class Coil02 extends Level {
    constructor() {
        super()

        this.reflect = true

        this.addHotspot(xs[0], ys[0], false)
        this.addHotspot(xs[1], ys[1], false)
        this.addHotspot(xs[2], ys[2], false)
        this.addHotspot(xs[3], ys[3], false)
        this.addHotspot(xs[4], ys[4], false)
        this.addHotspot(xs[5], ys[5], false)
        this.addHotspot(xs[6], ys[6], true)
        this.addHotspot(xs[7], ys[7], true)
        this.addHotspot(xs[8], ys[8], true)
        this.addHotspot(xs[9], ys[9], true)
        this.addHotspot(xs[10], ys[10], true)
        this.addHotspot(xs[11], ys[11], true)
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)
    }
}
