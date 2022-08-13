import { Pointer } from '../node_modules/natlib/controls/Pointer.js'

// Our internal resolution is (420, 270) with PAR of 8:7
export const IR_SCREEN_WIDTH = 420
export const IR_SCREEN_HEIGHT = 270

// Our internal point size in document pixels
export const IR_X = 2 * (8 / 7)
export const IR_Y = 2

type LineFunction = (x0: number, y0: number, x1: number, y1: number) => void

/** Painting pointer class */
export class Painter extends Pointer {
    paintLine: LineFunction

    constructor(canvas: HTMLCanvasElement, paintLine: LineFunction) {
        super(canvas)

        this.paintLine = paintLine
    }

    override setPosition(event: MouseEvent | Touch) {
        const _x = this.x
        const _y = this.y
        const _held = this.held

        super.setPosition(event)

        // Paint the line if we're dragging continually
        if (_held && this.held) {
            this.paintLine(_x, _y, this.x, this.y)
        }
    }
}
