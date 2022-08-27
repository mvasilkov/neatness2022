import { Mulberry32 } from '../../node_modules/natlib/prng/Mulberry32.js'

import { Hotspot } from '../Hotspot.js'
import { Level } from '../Level.js'
import { tiles, width, xs, ys } from './tiles/Fungus01.js'

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

        const prng = new Mulberry32(12)

        const fungus = new Hotspot(this, xs[1], ys[1], 3, false)
        fungus._paintInternal((x, y) => {
            if (prng.random() < 0.5) this.setPoint(x, y, 3)
        })
    }
}
