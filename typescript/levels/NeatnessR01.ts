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
