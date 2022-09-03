import { tiles, width, xs, ys } from '../bitmaps/NeatnessR03.js'
import { Level } from '../Level.js'

export class NeatnessR03 extends Level {
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
