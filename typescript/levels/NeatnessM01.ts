import { tiles, width, xs, ys } from '../bitmaps/NeatnessM01.js'
import { Level } from '../Level.js'
import { state } from '../state.js'

export class NeatnessM01 extends Level {
    constructor() {
        super()

        this.buttonsEnabled = state.completedLevels[3] ? 3 : 2

        this.addHotspot(xs[0], ys[0], false)
        this.addHotspot(xs[1], ys[1], true)
        this.addHotspot(xs[2], ys[2], false)
        this.addHotspot(xs[3], ys[3], true)
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)
    }
}
