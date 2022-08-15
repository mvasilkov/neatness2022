import { conPaint } from './canvas.js'
import { Hotspot } from './hotspot.js'
import { IR_SCREEN_HEIGHT, IR_SCREEN_WIDTH, painting } from './paint.js'

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
        this.hotspots = Object.create(null)
    }

    reset() {
        conPaint.fillStyle = '#000'
        conPaint.fillRect(0, 0, IR_SCREEN_WIDTH, IR_SCREEN_HEIGHT)

        for (let y = 0; y < IR_SCREEN_HEIGHT; ++y) {
            for (let x = 0; x < IR_SCREEN_WIDTH; ++x) {
                painting[y][x] = 0
            }
        }

        for (const hotspot of Object.values(this.hotspots)) {
            hotspot.paintInternal()
        }
    }

    addHotspot(x: number, y: number, isExit: boolean) {
        const startIndex = isExit ? 20 : 10
        const collection = isExit ? this.exitPoints : this.entryPoints

        const hotspot = new Hotspot(this, x, y, startIndex + collection.length, isExit)
        collection.push(this.hotspots[hotspot.index] = hotspot)

        hotspot.paintInternal()
    }

    setPoint(x: number, y: number, index: number) {
        painting[y][x] = index

        let color
        if (index === 0) color = '#000'
        else if (index === 1) color = '#ff0080'
        else color = '#fff'

        conPaint.fillStyle = color
        conPaint.fillRect(x, y, 1, 1)
    }
}
