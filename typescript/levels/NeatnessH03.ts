/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { tiles, width, xs, ys } from '../bitmaps/NeatnessH03.js'
import { Level } from '../Level.js'

export class NeatnessH03 extends Level {
    constructor() {
        super()

        this.fungus = true
        this.fungusLeft = xs[0]
        this.fungusTop = ys[0]
        this.fungusRight = xs[6]
        this.fungusBottom = ys[6]

        this.addHotspot(xs[1], ys[1], false)
        this.addHotspot(xs[2], ys[2], true)
        this.addHotspot(xs[4], ys[4], false)
        this.addHotspot(xs[5], ys[5], true)
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)

        this.paintInternalFungus(xs[3], ys[3], 10)
    }
}
