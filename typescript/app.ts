import { lerp } from '../node_modules/natlib/interpolation.js'
import { startMainloop } from '../node_modules/natlib/scheduling/mainloop.js'
import { Vec2 } from '../node_modules/natlib/Vec2.js'

import { canvasPaint, conUI, SCREEN_HEIGHT, SCREEN_WIDTH } from './canvas.js'
import { ddaWalk } from './ddaWalk.js'
import { floodFill } from './floodFill.js'
import { IR_SCREEN_HEIGHT, IR_SCREEN_WIDTH, IR_X, IR_Y, Painter, painting } from './paint.js'
import { FAILURE_ENTER_DURATION, FAILURE_EXIT_DURATION, LevelPhase, state, update } from './state.js'

const pointer = new Painter(canvasPaint.canvas, paintLine)
pointer.addEventListeners(document)

//#region Line painting function

/** (x, y, index) */
type FloodFillPoint = [number, number, number]

const startPoint = new Vec2
const endPoint = new Vec2

function paintLine(x0: number, y0: number, x1: number, y1: number) {
    if (state.levelPhase !== LevelPhase.RUNNING) return

    // Convert to internal resolution
    x0 = (x0 + 0.5) / IR_X
    y0 = (y0 + 0.5) / IR_Y
    x1 = (x1 + 0.5) / IR_X
    y1 = (y1 + 0.5) / IR_Y

    if (x0 < 0 || x0 >= IR_SCREEN_WIDTH ||
        y0 < 0 || y0 >= IR_SCREEN_HEIGHT) {

        return // Out of bounds, do nothing
    }

    const x0trunc = x0 | 0
    const y0trunc = y0 | 0
    const x1trunc = x1 | 0
    const y1trunc = y1 | 0

    activatePoint(x0trunc, y0trunc)

    // Check if it's a single point
    if (x0trunc === x1trunc && y0trunc === y1trunc) {
        // Flood fill and return
        const adjacentIndex = state.level.getAnyConnectedNeighbour(x0trunc, y0trunc)
        if (adjacentIndex !== 0) {
            _floodFill([[x0trunc, y0trunc, adjacentIndex]])
        }
        return
    }

    startPoint.set(x0, y0)
    const expectedLength = endPoint.set(x1, y1).subtract(startPoint).length()

    // Flood fill state
    const pointsToFloodFill: FloodFillPoint[] = []
    let addedPointInThisRun = false

    ddaWalk(startPoint, endPoint.normalize(), function (x, y, length) {
        if (x < 0 || x >= IR_SCREEN_WIDTH ||
            y < 0 || y >= IR_SCREEN_HEIGHT) {

            return true // Out of bounds, stop
        }

        // Paint the actual line
        if (activatePoint(x, y)) {
            // If we're still waiting for a flood fill point
            if (!addedPointInThisRun) {
                // Save an adjacent connection's index
                const adjacentIndex = state.level.getAnyConnectedNeighbour(x, y)
                if (adjacentIndex !== 0) {
                    pointsToFloodFill.push([x, y, adjacentIndex])
                    addedPointInThisRun = true
                }
            }
        }
        else {
            // Hit an obstacle
            addedPointInThisRun = false
        }

        if (x === x1trunc && y === y1trunc) {
            return true // Got to the end, stop
        }

        if (length >= expectedLength) {
            return true // Passed the end point, stop
        }
    })

    // Flood fill
    _floodFill(pointsToFloodFill)
}

function _floodFill(pointsToFloodFill: FloodFillPoint[]) {
    for (const [x, y, index] of pointsToFloodFill) {
        floodFill(painting, IR_SCREEN_WIDTH, IR_SCREEN_HEIGHT, x, y, 1, function updatePoint(x, y) {
            // Update the point
            state.level.setPoint(x, y, index)

            // Make connections
            for (const otherIndex of state.level.getNeighbourhood(x, y)) {
                if (otherIndex > 9 && otherIndex !== index) {
                    state.level.connect(index, otherIndex)
                }
            }
        })
    }
}

function activatePoint(x: number, y: number): boolean {
    const currentValue = painting[y][x]

    // Can only paint over nothing (0) or unconnected paint (1).
    if (currentValue > 1) return false

    state.level.setPoint(x, y, 1)

    return true
}

//#endregion

//#region Mainloop

function paint(t: number) {
    conUI.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

    const phaseProgress = lerp(state.oldProgress, state.phaseProgress, t)

    switch (state.levelPhase) {
        case LevelPhase.RUNNING:
            // Fade out the failure screen
            if (phaseProgress > 0) {
                paintFailureScreen(phaseProgress / FAILURE_EXIT_DURATION)
            }
            break

        case LevelPhase.FAILING:
            // Fade in the failure screen
            paintFailureScreen(phaseProgress / FAILURE_ENTER_DURATION)
            break
    }
}

function paintFailureScreen(opacity: number) {
    if (!state.failureScreen) return

    conUI.globalAlpha = opacity
    conUI.drawImage(state.failureScreen,
        0, 0, state.failureScreen.width, state.failureScreen.height,
        0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
    conUI.globalAlpha = 1
}

startMainloop(update, paint)

//#endregion
