/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { tiles, width, xs, ys } from '../bitmaps/Neatness02.js'
import { conUI, paintTextBlob } from '../canvas.js'
import { Colors } from '../colors/colors.js'
import { Level } from '../Level.js'
import { Settings } from '../prelude.js'
import { state } from '../state.js'

export class Neatness02 extends Level {
    constructor() {
        super()

        this.buttonsEnabled = state.completedLevels[1] ? 3 : 2

        this.addHotspot(xs[0], ys[0], false)
        this.addHotspot(xs[1], ys[1], true)
    }

    // @ts-expect-error 't' is declared but its value is never read.
    override paint(t: number): void {
        paintTextBlob(conUI,
            0.5 * Settings.SCREEN_WIDTH,
            0.15 * Settings.SCREEN_HEIGHT,
            48, 'bold 48', Colors.tile, 'The Neatness')
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)
    }
}
