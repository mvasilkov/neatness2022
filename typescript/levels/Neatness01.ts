import { Level } from '../Level.js'
import { Settings } from '../prelude.js'

export class Neatness01 extends Level {
    constructor() {
        super()

        this.reflect = true

        const x0 = 0.25 * Settings.IR_SCREEN_WIDTH | 0
        const y0 = 0.5 * Settings.IR_SCREEN_HEIGHT | 0
        const step = 20

        for (let y = 0; y < 3; ++y) {
            for (let x = 0; x < 3; ++x) {
                this.addHotspot((x - 1) * step + x0, (y - 1) * step + y0, false)
            }
        }

        this.addHotspot(0.75 * Settings.IR_SCREEN_WIDTH | 0, 0.5 * Settings.IR_SCREEN_HEIGHT | 0, true)
    }
}
