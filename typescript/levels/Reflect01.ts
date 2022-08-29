import { tiles, width } from '../bitmaps/Reflect01.js'
import { Level } from '../Level.js'
import { Settings } from '../prelude.js'

export class Reflect01 extends Level {
    constructor() {
        super()

        this.reflect = true

        this.addHotspot(40, 40, false)
        this.addHotspot(Settings.IR_SCREEN_WIDTH - 40,
            Settings.IR_SCREEN_HEIGHT - 40, true)
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)
    }
}
