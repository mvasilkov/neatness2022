/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { tiles, width, xs, ys } from '../bitmaps/Ending.js'
import { conUI, paintTextBlob } from '../canvas.js'
import { Colors } from '../colors/colors.js'
import { Level } from '../Level.js'
import { Settings } from '../prelude.js'
import { paintEnding } from '../visuals.js'

export class Ending extends Level {
    opacity: number

    constructor() {
        super()

        this.addHotspot(xs[0], ys[0], false)
        this.addHotspot(xs[1], ys[1], true)

        this.opacity = 1
    }

    override reset(): void {
        super.reset()

        this.opacity = 1
    }

    override setPoint(x: number, y: number, index: number): void {
        super.setPoint(x, y, index)

        if (this.entryPoints[0].isSatisfied && this.exitPoints[0].isSatisfied) return

        if (index === 1 || index > 9) {
            this.opacity =
                x < xs[0] ? 1 :
                    x > xs[1] ? 0 :
                        1 - (x - xs[0]) / (xs[1] - xs[0])
        }
    }

    // @ts-expect-error 't' is declared but its value is never read.
    override paint(t: number): void {
        paintEnding(this.opacity)

        paintTextBlob(conUI,
            0.5 * Settings.SCREEN_WIDTH,
            0.15 * Settings.SCREEN_HEIGHT,
            24, '24', Colors.tile, 'Thank you for playing!')

        paintTextBlob(conUI,
            0.5 * Settings.SCREEN_WIDTH,
            0.85 * Settings.SCREEN_HEIGHT,
            24, '24', Colors.tile, 'But our princess is in another castle!')
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)
    }
}
