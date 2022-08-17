import { astar } from './astar.js'
import { conPaint } from './canvas.js'
import { Hotspot } from './Hotspot.js'
import { IR_SCREEN_HEIGHT, IR_SCREEN_WIDTH, painting } from './paint.js'

// Indices are as follows:
// 0 – nothing
// 1 – unconnected paint
// [10, 20) – entry point
// [20, 30) – exit point

export class Level {
    entryPoints: Hotspot[]
    exitPoints: Hotspot[]
    hotspots: { [n: number]: Hotspot }
    connected: boolean[][]

    constructor() {
        this.entryPoints = []
        this.exitPoints = []
        this.hotspots = Object.create(null)

        // Lazy connectivity table using sparse arrays,
        // I wish I had a defaultdict like in Python.
        this.connected = Array.from({ length: 30 }, () => [])
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
        else if (index === 1) color = '#f87b1b'
        else if (index >= 10 && index < 20) color = '#fb3b64'
        else if (index >= 20 && index < 30) color = '#b3e363'
        else color = '#fdbd8f'

        conPaint.fillStyle = color
        conPaint.fillRect(x, y, 1, 1)
    }

    getNeighbourhood(x: number, y: number) {
        const neighbours = [
            // left
            (x > 0) ? painting[y][x - 1] : 0,
            // top
            (y > 0) ? painting[y - 1][x] : 0,
            // right
            (x < IR_SCREEN_WIDTH - 1) ? painting[y][x + 1] : 0,
            // bottom
            (y < IR_SCREEN_HEIGHT - 1) ? painting[y + 1][x] : 0,
        ]
        return neighbours
    }

    getAnyConnectedNeighbour(x: number, y: number) {
        const neighbours = this.getNeighbourhood(x, y)

        // Any neighbour's index in the range [10, 30) – a hotspot.
        // Return 0 if there's none.
        return (
            neighbours[0] > 9 ? neighbours[0] :
                (neighbours[1] > 9 ? neighbours[1] :
                    (neighbours[2] > 9 ? neighbours[2] :
                        (neighbours[3] > 9 ? neighbours[3] : 0)))
        )
    }

    connect(a: number, b: number) {
        if (a === b || this.connected[a][b]) return false

        console.log(`Connecting ${a} to ${b}`)
        highlightPath(this.hotspots[a], this.hotspots[b])

        this.connected[a][b] = true
        this.connected[b][a] = true

        return true
    }
}

/** Highlight a path from a to b. */
function highlightPath(a: Hotspot, b: Hotspot) {
    conPaint.fillStyle = '#ffe08b'

    astar(painting, IR_SCREEN_WIDTH, IR_SCREEN_HEIGHT, a.x, a.y, b.x, b.y, function (x, y) {
        conPaint.fillRect(x, y, 1, 1)
    })
}
