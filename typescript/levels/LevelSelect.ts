import { conPaint, conUI, paintTextBlob } from '../canvas.js'
import { Colors } from '../colors/colors.js'
import { Level } from '../Level.js'
import { Settings } from '../prelude.js'
import { enterLevelPhase, LevelPhase, state } from '../state.js'

type WalkFunction = (x: number, y: number, n: number) => void

function walkLevels(Δr: number, walkFunction: WalkFunction) {
    const x0 = 0.5 * Settings.IR_SCREEN_WIDTH
    const y0 = 0.5 * Settings.IR_SCREEN_HEIGHT

    const rx = 0.5 * Settings.IR_SCREEN_WIDTH - 6 * Settings.TILE_WIDTH + Δr
    const ry = 0.5 * Settings.IR_SCREEN_HEIGHT - 4 * Settings.TILE_HEIGHT + Δr

    // Save coordinates for Coil levels
    const xs: number[] = []
    const ys: number[] = []

    for (let n = 0; n < Settings.totalLevels; ++n) {
        const angle = Math.PI * (1.32 * n / (Settings.totalLevels - 1) - 1.16)
        const x = rx * Math.cos(angle) + x0 | 0
        const y = ry * Math.sin(angle) + y0 | 0

        walkFunction(x, y, n)

        if (n > 5 && n < 9) {
            xs.push(x)
            ys.push(Settings.IR_SCREEN_HEIGHT - y)
        }
    }

    // Coil levels
    for (let n = 0; n < 3; ++n) {
        walkFunction(xs[n], ys[n], Settings.totalLevels + n + 1)
    }
}

export class LevelSelect extends Level {
    constructor() {
        super()

        this.buttonsEnabled = 2

        this.addHotspot(0.5 * Settings.IR_SCREEN_WIDTH,
            0.5 * Settings.IR_SCREEN_HEIGHT, false)

        walkLevels(-20, (x, y) => {
            this.addHotspot(x, y, true)
        })
    }

    override _connect(a: number, b: number): void {
        super._connect(a, b)

        const start = this.entryPoints[0].index
        let other: number

        if (start === a) other = b
        else if (start === b) other = a
        else return

        if (this.entryPoints[0].isSatisfied) {
            state.levelIndex = other - this.exitPoints[0].index - 1
            // Correct for padding
            if (state.levelIndex >= Settings.totalLevels - 1) ++state.levelIndex
            enterLevelPhase(LevelPhase.WINNING)
        }
    }

    // @ts-expect-error 't' is declared but its value is never read.
    override paint(t: number): void {
        paintTextBlob(conUI,
            0.5 * Settings.SCREEN_WIDTH,
            0.65 * Settings.SCREEN_HEIGHT,
            48, 'bold 48', Colors.tile, 'The Neatness')
    }

    override paintInternal(): void {
        walkLevels(0, (x, y, n) => {
            const color = n === state.currentLevel ? Colors.tile :
                state.completedLevels[n] ? '#7b8382' : '#ff0040'
            const title = n > Settings.totalLevels ? 'Coil-' + (n - Settings.totalLevels) : '' + (n + 1)
            paintTextBlob(conPaint, x, y, 12, '200 12', color, title, '#0000')
        })
    }
}
