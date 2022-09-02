import { Pointer } from '../node_modules/natlib/controls/Pointer.js'

type LineFunction = (x0: number, y0: number, x1: number, y1: number) => void

/** Painting pointer class */
export class Painter extends Pointer {
    readonly paintLine: LineFunction
    receivedFirstEvent: boolean

    constructor(canvas: HTMLCanvasElement, paintLine: LineFunction) {
        super(canvas)

        this.paintLine = paintLine
        this.receivedFirstEvent = false
    }

    override setPosition(event: MouseEvent | Touch) {
        const _x = this.x
        const _y = this.y

        super.setPosition(event)

        if (this.receivedFirstEvent) {
            // Paint by dragging
            if (this.held) {
                this.paintLine(_x, _y, this.x, this.y)
            }
        }
        else {
            // If the first event has held=true, that's a bug, so skip it.
            this.receivedFirstEvent = true
        }
    }
}
