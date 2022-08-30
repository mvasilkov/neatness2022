import { xs } from '../bitmaps/Neatness02.js'
import { Level } from '../Level.js'
import { Settings } from '../prelude.js'

export class Neatness01 extends Level {
    constructor() {
        super()

        const y = 0.5 * Settings.IR_SCREEN_HEIGHT | 0

        this.addHotspot(xs[0], y, false)
        this.addHotspot(xs[1], y, true)
    }
}
