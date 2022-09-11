/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { Pointer } from '../node_modules/natlib/controls/Pointer.js'

import { autoscale } from './autoscale.js'
import { state } from './state.js'

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

        autoscale.documentToViewport(this)

        if (this.receivedFirstEvent) {
            // Paint by dragging
            if (this.held && state.held) {
                this.paintLine(_x, _y, this.x, this.y)
            }
        }
        else {
            // If the first event has held=true, that's a bug, so skip it.
            this.receivedFirstEvent = true
        }

        // Initialize audio if needed
        /*
        if (this.held && !audioHandle.initialized) {
            audioHandle.initialize(initializeAudio)
        }
        */
    }
}
