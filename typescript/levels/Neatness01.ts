import { Level } from '../Level.js'
import { IR_SCREEN_HEIGHT, IR_SCREEN_WIDTH } from '../paint.js'

export class Neatness01 extends Level {
    constructor() {
        super()

        this.addHotspot(0.25 * IR_SCREEN_WIDTH | 0, 0.5 * IR_SCREEN_HEIGHT | 0, false)
        this.addHotspot(0.75 * IR_SCREEN_WIDTH | 0, 0.5 * IR_SCREEN_HEIGHT | 0, true)

        // For testing only
        this.addHotspot(0.5 * IR_SCREEN_WIDTH | 0, 0.5 * IR_SCREEN_HEIGHT | 0, true)
    }
}
