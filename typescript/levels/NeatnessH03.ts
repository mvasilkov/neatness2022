/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { tiles, width, xs, ys } from '../bitmaps/NeatnessH03.js'
import { conUI, paintTextBlob } from '../canvas.js'
import { Colors } from '../colors/colors.js'
import { Level } from '../Level.js'
import { Settings } from '../prelude.js'

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

    // @ts-expect-error 't' is declared but its value is never read.
    override paint(t: number): void {
        paintTextBlob(conUI,
            0.5 * Settings.SCREEN_WIDTH,
            0.8 * Settings.SCREEN_HEIGHT,
            24, '24', Colors.tile, 'Written by Mark Vasilkov for js13kGames in 2022')
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)

        this.paintInternalFungus(xs[3], ys[3], 10)
    }
}
