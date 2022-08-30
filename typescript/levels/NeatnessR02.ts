import { tiles, width, xs, ys } from '../bitmaps/NeatnessR02.js'
import { Level } from '../Level.js'

export class NeatnessR02 extends Level {
    constructor() {
        super()

        this.reflect = true

        this.addHotspot(xs[0], ys[0], false)
        this.addHotspot(xs[1], ys[1], true)
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)
    }
}
