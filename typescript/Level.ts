import { Mulberry32 } from '../node_modules/natlib/prng/Mulberry32.js'

import { paint1BppSprite, paintToolbar } from './buttons.js'
import { conPaint } from './canvas.js'
import { colorPaint, colorPaintA, colorPaintAInversion, colorPaintB, colorPaintBInversion, colorPaintInversion, colorTile, colorTileInversion } from './colors/colors.js'
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
    // Fungus
    fungus: boolean
    fungusGeneration: number
    fungusLeft: number
    fungusTop: number
    fungusRight: number
    fungusBottom: number

    constructor() {
        this.entryPoints = []
        this.exitPoints = []
        this.hotspots = Object.create(null)

        // Lazy connectivity table using sparse arrays,
        // I wish I had a defaultdict like in Python.
        this.connected = Array.from({ length: 30 }, () => [])

        this.reflect = false
        // Fungus
        this.fungus = false
        this.fungusGeneration = 0
        this.fungusLeft = 0
        this.fungusTop = 0
        this.fungusRight = 0
        this.fungusBottom = 0
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

        if (this.reflect) {
            conPaint.fillStyle = '#fbfbfb'
            conPaint.fillRect(0.5 * Settings.IR_SCREEN_WIDTH, 0,
                0.5 * Settings.IR_SCREEN_WIDTH, Settings.IR_SCREEN_HEIGHT)
        }

        // 3) Painting buffer
        for (let y = 0; y < Settings.IR_SCREEN_HEIGHT; ++y) {
            for (let x = 0; x < Settings.IR_SCREEN_WIDTH; ++x) {
                painting[y][x] = 0
            }
        }
        this.fungusGeneration = 0
        this.paintInternal()
        paintToolbar()

        // 4) Hotspots
        for (const hotspot of Object.values(this.hotspots)) {
            hotspot.isSatisfied = false
            hotspot.paintInternal()
        }
    }

    addHotspot(x: number, y: number, isExit: boolean) {
        const startIndex = isExit ? 20 : 10
        const collection = isExit ? this.exitPoints : this.entryPoints

        const hotspot = new Hotspot(this, x, y, startIndex + collection.length, isExit)
        collection.push(this.hotspots[hotspot.index] = hotspot)
    }

    setPoint(x: number, y: number, index: number) {
        painting[y][x] = index

        const inv = this.reflect && x >= 0.5 * Settings.IR_SCREEN_WIDTH

        let color
        if (index === 0) color = '#000' // This shouldn't happen
        else if (index === 1) color = (inv ? colorPaintInversion : colorPaint)
        else if (index === 2) color = (inv ? colorTileInversion : colorTile)
        else if (index === 3) color = '#ff0040' + (4 * this.fungusGeneration + 127).toString(16)
        else if (index >= 10 && index < 20) color =
            this.hotspots[index].isSatisfied ? (inv ? colorPaintInversion : colorPaint) : (inv ? colorPaintAInversion : colorPaintA)
        else if (index >= 20 && index < 30) color =
            this.hotspots[index].isSatisfied ? (inv ? colorPaintInversion : colorPaint) : (inv ? colorPaintBInversion : colorPaintB)
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

    hasWon(): boolean {
        for (const hotspot of this.entryPoints) {
            if (!hotspot.isSatisfied) return false
        }
        return true
    }

    paintInternal() {
    }

    paintInternalTiles(tiles: number[], width: number, tileWidth = Settings.TILE_WIDTH, tileHeight = Settings.TILE_HEIGHT) {
        const x0 = 0.5 * (Settings.IR_SCREEN_WIDTH - tileWidth * width) | 0
        const y0 = 0.5 * (Settings.IR_SCREEN_HEIGHT - tileHeight * tiles.length) | 0

        // Outline
        conPaint.fillStyle = '#202020'
        paint1BppSprite(tiles, width, (x, y) => {
            conPaint.fillRect(
                tileWidth * x + x0 - 0.5,
                tileHeight * y + y0 - 0.5,
                tileWidth + 1, tileHeight + 1)
        })

        paint1BppSprite(tiles, width, (x, y) => {
            // Paint a tile
            for (let v = 0; v < tileHeight; ++v) {
                for (let u = 0; u < tileWidth; ++u) {
                    this.setPoint(
                        u + tileWidth * x + x0,
                        v + tileHeight * y + y0, 2)
                }
            }
        })
    }

    paintInternalTiles2(tiles: number[], width: number, tileWidth = Settings.TILE_WIDTH, tileHeight = Settings.TILE_HEIGHT) {
        const spriteWidth = tileWidth * width
        const x0 = 0.5 * Settings.IR_SCREEN_WIDTH - spriteWidth | 0
        const y0 = 0.5 * (Settings.IR_SCREEN_HEIGHT - tileHeight * tiles.length) | 0

        const outlineFun = (x0: number, y0: number) => {
            return (x: number, y: number) => {
                conPaint.fillRect(
                    tileWidth * x + x0 - 0.5,
                    tileHeight * y + y0 - 0.5,
                    tileWidth + 1, tileHeight + 1)
            }
        }

        const paintFun = (x0: number, y0: number) => {
            return (x: number, y: number) => {
                // Paint a tile
                for (let v = 0; v < tileHeight; ++v) {
                    for (let u = 0; u < tileWidth; ++u) {
                        this.setPoint(
                            u + tileWidth * x + x0,
                            v + tileHeight * y + y0, 2)
                    }
                }
            }
        }

        // Outline
        conPaint.fillStyle = '#202020'
        paint1BppSprite(tiles, width, outlineFun(x0, y0))
        paint1BppSprite(tiles, width, outlineFun(x0 + spriteWidth, y0), true)

        paint1BppSprite(tiles, width, paintFun(x0, y0))
        paint1BppSprite(tiles, width, paintFun(x0 + spriteWidth, y0), true)
    }

    paintInternalFungus(x0: number, y0: number, prngSeed: number) {
        const prng = new Mulberry32(prngSeed)

        const fungus = new Hotspot(this, x0, y0, 3, false)
        fungus._paintInternal((x, y) => {
            if (prng.random() < 0.5) this.setPoint(x, y, 3)
        })
    }

    advanceFungus() {
        if (!this.fungus) return

        for (let y = this.fungusTop; y < this.fungusBottom; ++y) {
            for (let x = this.fungusLeft; x < this.fungusRight; ++x) {
                oldPainting[y][x] = painting[y][x]
            }
        }

        let left: number, center: number, right: number

        for (let y = this.fungusTop; y < this.fungusBottom; ++y) {
            left = 0
            center = this._fungusCol(this.fungusLeft, y)

            for (let x = this.fungusLeft; x < this.fungusRight; ++x) {
                right = x < this.fungusRight - 1 ? this._fungusCol(x + 1, y) : 0

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

        ++this.fungusGeneration
        if (this.fungusGeneration > Settings.fungusLifeExpectancy) {
            this.fungusGeneration = 0
        }
    }

    _fungusCol(x: number, y: number) {
        return (y > this.fungusTop && oldPainting[y - 1][x] === 3 ? 1 : 0) +
            (oldPainting[y][x] === 3 ? 1 : 0) +
            (y < this.fungusBottom - 1 && oldPainting[y + 1][x] === 3 ? 1 : 0)
    }
}
