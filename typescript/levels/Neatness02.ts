import { Level } from '../Level.js'
import { tiles, width } from './tiles/Neatness02.js'

export class Neatness02 extends Level {
    constructor() {
        super()

        this.addHotspot(126, 103, false)
        this.addHotspot(294, 167, true)
    }

    override paintInternal() {
        this.paintInternalTiles(tiles, width)
    }
}
