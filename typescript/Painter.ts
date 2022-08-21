import { Pointer } from '../node_modules/natlib/controls/Pointer.js'

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

        // Paint by dragging
        if (_held && this.held) {
            this.paintLine(_x, _y, this.x, this.y)
        }
    }
}
