import { tiles, width, xs, ys } from '../bitmaps/NeatnessR06.js'
import { Level } from '../Level.js'

export class NeatnessR06 extends Level {
    constructor() {
        super()

        this.reflect = true

        this.addHotspot(xs[0], ys[0], false)
        this.addHotspot(xs[1], ys[1], true)
        this.addHotspot(xs[2], ys[2], false)
        this.addHotspot(xs[3], ys[3], false)
        this.addHotspot(xs[4], ys[4], true)
        this.addHotspot(xs[5], ys[5], true)
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)
    }
}