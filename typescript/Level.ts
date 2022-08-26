import { conPaint } from './canvas.js'
import { Hotspot } from './Hotspot.js'
import { oldPainting, painting, Settings } from './prelude.js'
import { enterLevelPhase, LevelPhase } from './state.js'

// Indices are as follows:
// 0 – nothing
// 1 – unconnected paint
// 2 – tile
// 3 – fungus
// [10, 20) – entry point
// [20, 30) – exit point

export class Level {
    entryPoints: Hotspot[]
    exitPoints: Hotspot[]
    hotspots: { [n: number]: Hotspot }
    connected: boolean[][]
    reflect: boolean
    fungus: boolean
    fungusGeneration: number

    constructor() {
        this.entryPoints = []
        this.exitPoints = []
        this.hotspots = Object.create(null)

        // Lazy connectivity table using sparse arrays,
        // I wish I had a defaultdict like in Python.
        this.connected = Array.from({ length: 30 }, () => [])

        this.reflect = false
        this.fungus = false
        this.fungusGeneration = 0
    }

    reset() {
        // 1) Connections
        for (const a of this.connected) {
            a.length = 0
        }

        // 2) Painting canvas
        conPaint.fillStyle = '#000'
        conPaint.fillRect(0, 0,
            Settings.IR_SCREEN_WIDTH, Settings.IR_SCREEN_HEIGHT)

        // 3) Painting buffer
        for (let y = 0; y < Settings.IR_SCREEN_HEIGHT; ++y) {
            for (let x = 0; x < Settings.IR_SCREEN_WIDTH; ++x) {
                painting[y][x] = 0
            }
        }
        this.paintInternal()

        // 4) Hotspots
        for (const hotspot of Object.values(this.hotspots)) {
            hotspot.isSatisfied = false
            hotspot.paintInternal()
        }

        // 5) Fungus
        this.fungusGeneration = 0
    }

    addHotspot(x: number, y: number, isExit: boolean) {
        const startIndex = isExit ? 20 : 10
        const collection = isExit ? this.exitPoints : this.entryPoints

        const hotspot = new Hotspot(this, x, y, startIndex + collection.length, isExit)
        collection.push(this.hotspots[hotspot.index] = hotspot)
    }

    setPoint(x: number, y: number, index: number) {
        painting[y][x] = index

        // Colors: https://lospec.com/palette-list/blk-neo
        let color
        if (index === 0) color = '#000' // This shouldn't happen
        else if (index === 1) color = '#ffe091'
        else if (index === 2) color = '#eaeae8'
        else if (index === 3) color = '#ff0040' + (this.fungusGeneration + 128).toString(16)
        else if (index >= 10 && index < 20) color =
            this.hotspots[index].isSatisfied ? '#ffe091' : '#8cff9b'
        else if (index >= 20 && index < 30) color =
            this.hotspots[index].isSatisfied ? '#ffe091' : '#78fae6'
        else color = '#ff0040' // This shouldn't happen

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
            (x < Settings.IR_SCREEN_WIDTH - 1) ? painting[y][x + 1] : 0,
            // bottom
            (y < Settings.IR_SCREEN_HEIGHT - 1) ? painting[y + 1][x] : 0,
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

    _connect(a: number, b: number) {
        if (a === b || this.connected[a][b]) return

        console.log(`Connecting ${a} to ${b}`)

        this.connected[a][b] = true
        this.connected[b][a] = true

        if ((0.1 * a | 0) === (0.1 * b | 0)) {
            // Failing state
            // Can't call this.reset() here!
            enterLevelPhase(LevelPhase.FAILING)
        }
        else {
            // Satisfying connection
            this.hotspots[a].isSatisfied = this.hotspots[b].isSatisfied = true
            // Change color
            this.hotspots[a].paintInternal()
            this.hotspots[b].paintInternal()
        }
    }

    connect(a: number, b: number) {
        // Connect things to `b` that are connected to `a`
        for (const n in this.connected[a]) {
            if (this.connected[a][n]) this._connect(b, +n)
        }

        // Connect things to `a` that are connected to `b`
        for (const n in this.connected[b]) {
            if (this.connected[b][n]) this._connect(a, +n)
        }

        this._connect(a, b)
    }

    paintInternal() {
    }

    paintInternalTiles(tiles: number[], width: number) {
        const x0 = 0.5 * (Settings.IR_SCREEN_WIDTH - Settings.TILE_WIDTH * width) | 0
        const y0 = 0.5 * (Settings.IR_SCREEN_HEIGHT - Settings.TILE_HEIGHT * tiles.length) | 0

        for (let y = 0; y < tiles.length; ++y) {
            for (let x = 0; x < width; ++x) {
                const a = tiles[y] >> (width - 1 - x) & 1
                if (a === 0) continue

                // Paint a tile
                for (let v = 0; v < Settings.TILE_HEIGHT; ++v) {
                    for (let u = 0; u < Settings.TILE_WIDTH; ++u) {
                        this.setPoint(
                            u + Settings.TILE_WIDTH * x + x0,
                            v + Settings.TILE_HEIGHT * y + y0, 2)
                    }
                }
            }
        }
    }

    advanceFungus() {
        if (!this.fungus) return

        for (let y = 0; y < Settings.IR_SCREEN_HEIGHT; ++y) {
            for (let x = 0; x < Settings.IR_SCREEN_WIDTH; ++x) {
                oldPainting[y][x] = painting[y][x]
            }
        }

        let left: number, center: number, right: number

        for (let y = 0; y < Settings.IR_SCREEN_HEIGHT; ++y) {
            left = 0
            center = _fungusCol(0, y)

            for (let x = 0; x < Settings.IR_SCREEN_WIDTH; ++x) {
                right = x < Settings.IR_SCREEN_WIDTH - 1 ? _fungusCol(x + 1, y) : 0

                if (painting[y][x] === 0) {
                    const neighbours = left + center + right - (oldPainting[y][x] === 3 ? 1 : 0)
                    if (neighbours === 3 || neighbours === 6) {
                        this.setPoint(x, y, 3)
                    }
                }

                left = center
                center = right
            }
        }

        this.fungusGeneration += 4
        if (this.fungusGeneration >= Settings.fungusRange) {
            this.fungusGeneration = 0
        }
    }
}

function _fungusCol(x: number, y: number) {
    return (y > 0 && oldPainting[y - 1][x] === 3 ? 1 : 0) +
        (oldPainting[y][x] === 3 ? 1 : 0) +
        (y < Settings.IR_SCREEN_HEIGHT - 1 && oldPainting[y + 1][x] === 3 ? 1 : 0)
}
