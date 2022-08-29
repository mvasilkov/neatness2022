import { tiles, width, xs, ys } from '../bitmaps/Neatness02.js'
import { Level } from '../Level.js'

export class Neatness02 extends Level {
    constructor() {
        super()

        this.addHotspot(xs[0], ys[0], false)
        this.addHotspot(xs[1], ys[1], true)
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)
    }
}
