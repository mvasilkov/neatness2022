import { tiles, width, xs, ys } from '../bitmaps/NeatnessH01.js'
import { conUI, paintTextBlob } from '../canvas.js'
import { Colors } from '../colors/colors.js'
import { Level } from '../Level.js'
import { Settings } from '../prelude.js'

export class NeatnessH01 extends Level {
    constructor() {
        super()

        this.fungus = true
        this.fungusLeft = xs[0]
        this.fungusTop = ys[0]
        this.fungusRight = xs[4]
        this.fungusBottom = ys[4]

        this.addHotspot(xs[1], ys[1], false)
        this.addHotspot(xs[2], ys[2], true)
    }

    // @ts-expect-error 't' is declared but its value is never read.
    override paint(t: number): void {
        paintTextBlob(conUI,
            0.5 * Settings.SCREEN_WIDTH,
            0.8 * Settings.SCREEN_HEIGHT,
            24, '24', Colors.tile, 'They move when you move')
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)

        this.paintInternalFungus(xs[3], ys[3], 38)
    }
}
