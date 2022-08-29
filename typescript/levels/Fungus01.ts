import { tiles, width, xs, ys } from '../bitmaps/Fungus01.js'
import { Level } from '../Level.js'

export class Fungus01 extends Level {
    constructor() {
        super()

        this.fungus = true
        this.fungusLeft = xs[0]
        this.fungusTop = ys[0]
        this.fungusRight = xs[4]
        this.fungusBottom = ys[4]

        this.addHotspot(xs[2], ys[2], false)
        this.addHotspot(xs[3], ys[3], true)
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)

        this.paintInternalFungus(xs[1], ys[1], 12)
    }
}
