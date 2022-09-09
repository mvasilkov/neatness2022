import { tiles, width, xs, ys } from '../bitmaps/NeatnessM02.js'
import { Level } from '../Level.js'
import { state } from '../state.js'

export class NeatnessM02 extends Level {
    constructor() {
        super()

        this.buttonsEnabled = state.completedLevels[4] ? 3 : 2

        this.addHotspot(xs[0], ys[0], false)
        this.addHotspot(xs[1], ys[1], false)
        this.addHotspot(xs[2], ys[2], true)
        this.addHotspot(xs[3], ys[3], true)
    }

    override paintInternal() {
        this.paintInternalTiles2(tiles, width)
    }
}
