import { Hotspot } from './hotspot.js'

// Indices are as follows:
// 0 – nothing
// 1 – unconnected paint
// [10, 19] – entry point
// [20, 29] – exit point

export class Level {
    entryPoints: Hotspot[]
    exitPoints: Hotspot[]
    hotspots: { [n: number]: Hotspot }

    constructor() {
        this.entryPoints = []
        this.exitPoints = []
        this.hotspots = {}
    }

    addHotspot(x: number, y: number, isExit: boolean) {
        const startIndex = isExit ? 20 : 10
        const collection = isExit ? this.exitPoints : this.entryPoints

        const hotspot = new Hotspot(this, x, y, startIndex + collection.length, isExit)
        collection.push(this.hotspots[hotspot.index] = hotspot)
    }
}
