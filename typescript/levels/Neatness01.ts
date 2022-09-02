import { xs } from '../bitmaps/Neatness02.js'
import { conUI, paintTextBlob } from '../canvas.js'
import { Colors } from '../colors/colors.js'
import { Level } from '../Level.js'
import { Settings } from '../prelude.js'

export class Neatness01 extends Level {
    constructor() {
        super()

        const y = 0.5 * Settings.IR_SCREEN_HEIGHT | 0

        this.addHotspot(xs[0], y, false)
        this.addHotspot(xs[1], y, true)
    }

    // @ts-expect-error 't' is declared but its value is never read.
    override paint(t: number): void {
        paintTextBlob(conUI,
            0.5 * Settings.SCREEN_WIDTH,
            0.75 * Settings.SCREEN_HEIGHT,
            24, '24', Colors.tile, 'Connect the dots')
    }
}
