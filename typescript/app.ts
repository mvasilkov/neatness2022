import { lerp } from '../node_modules/natlib/interpolation.js'
import { startMainloop } from '../node_modules/natlib/scheduling/mainloop.js'
import { Vec2 } from '../node_modules/natlib/Vec2.js'

import { updateButtons } from './buttons.js'
import { canvasPaint, conUI } from './canvas.js'
import { paintCurtain, _paintCurtain } from './curtain.js'
import { ddaWalk } from './ddaWalk.js'
import { floodFill } from './floodFill.js'
import { enterLevel } from './levels.js'
import { Painter } from './Painter.js'
import { painting, Settings } from './prelude.js'
import { enterLevelPhase, LevelPhase, state } from './state.js'
import { paintRestartMessage } from './visuals.js'

const pointer = new Painter(canvasPaint.canvas, paintLine)
pointer.addEventListeners(document)

//#region Line painting function

const enum EnabledPart { ALL, LEFT, RIGHT }

/** (x, y, index) */
type FloodFillPoint = [number, number, number]

const startPoint = new Vec2
const endPoint = new Vec2

function paintLine(x0: number, y0: number, x1: number, y1: number) {
    _paintLine(x0, y0, x1, y1,
        state.level.reflect ? EnabledPart.LEFT : EnabledPart.ALL)

    if (state.level.reflect) {
        // Reflection
        _paintLine(Settings.SCREEN_WIDTH - x0, y0,
            Settings.SCREEN_WIDTH - x1, y1, EnabledPart.RIGHT)
    }
}

function _paintLine(x0: number, y0: number, x1: number, y1: number, enabled: EnabledPart) {
    if (state.levelPhase !== LevelPhase.RUNNING) return

    // Convert to internal resolution
    x0 = (x0 + 0.5) / Settings.IR_X
    y0 = (y0 + 0.5) / Settings.IR_Y
    x1 = (x1 + 0.5) / Settings.IR_X
    y1 = (y1 + 0.5) / Settings.IR_Y

    if (x0 < 0 || x0 >= Settings.IR_SCREEN_WIDTH ||
        y0 < 0 || y0 >= Settings.IR_SCREEN_HEIGHT) {

        return // Out of bounds, do nothing
    }

    const x0trunc = x0 | 0
    const y0trunc = y0 | 0
    const x1trunc = x1 | 0
    const y1trunc = y1 | 0

    activatePoint(x0trunc, y0trunc, enabled)

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

    // @ts-expect-error Not all code paths return a value.
    ddaWalk(startPoint, endPoint.normalize(), function (x, y, length) {
        if (x < 0 || x >= Settings.IR_SCREEN_WIDTH ||
            y < 0 || y >= Settings.IR_SCREEN_HEIGHT) {

            return true // Out of bounds, stop
        }

        // Paint the actual line
        if (activatePoint(x, y, enabled)) {
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
        floodFill(painting, Settings.IR_SCREEN_WIDTH, Settings.IR_SCREEN_HEIGHT, x, y, 1, function updatePoint(x, y) {
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

function activatePoint(x: number, y: number, enabled: EnabledPart): boolean {
    if (x < 0.5 * Settings.IR_SCREEN_WIDTH) {
        if (enabled === EnabledPart.RIGHT) return false
    }
    else {
        if (enabled === EnabledPart.LEFT) return false
    }

    const currentValue = painting[y][x]

    // Can only paint over nothing (0) or unconnected paint (1).
    if (currentValue > 1) return false

    state.level.setPoint(x, y, 1)

    if (currentValue === 0) state.level.advanceFungus()

    return true
}

//#endregion

//#region Mainloop

function update() {
    state.oldProgress = state.phaseProgress

    switch (state.levelPhase) {
        case LevelPhase.INITIAL:
            state.level.reset()
            enterLevelPhase(LevelPhase.ENTERING, Settings.curtainDuration)
            break

        case LevelPhase.ENTERING:
            if (--state.phaseProgress <= 0) {
                enterLevelPhase(LevelPhase.RUNNING)
            }
            break

        case LevelPhase.RUNNING:
            // Fade out restartMessage
            if (state.phaseProgress > 0) {
                --state.phaseProgress
            }
            // Turn skulls
            if (++state.skullsTurnProgress >= Settings.skullsTurnPeriod) {
                state.skullsTurnProgress -= Settings.skullsTurnPeriod
                if (Math.random() < 0.5 && state.level.entryPoints.length > 0) {
                    const n = Math.random() * state.level.entryPoints.length | 0
                    state.level.entryPoints[n].turn()
                }
            }
            // Already turning skulls
            for (const hotspot of state.level.entryPoints) {
                hotspot.update()
            }
            // Update button state
            updateButtons(pointer)
            // Win condition
            if (state.level.hasWon()) {
                enterLevelPhase(LevelPhase.WINNING)
            }
            break

        case LevelPhase.FAILING:
            // Cut the line
            pointer.held = false
            // Restart the level
            state.level.reset()
            enterLevelPhase(LevelPhase.RUNNING, Settings.restartMessageDuration)
            break

        case LevelPhase.WINNING:
            if (++state.phaseProgress >= Settings.curtainDuration) {
                enterLevel(++state.levelIndex)
            }
    }
}

function paint(t: number) {
    conUI.clearRect(0, 0, Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT)

    state.level.paint(t)

    for (const hotspot of Object.values(state.level.hotspots)) {
        hotspot.paint()
    }

    const phaseProgress = lerp(state.oldProgress, state.phaseProgress, t)

    switch (state.levelPhase) {
        case LevelPhase.INITIAL:
            // Paint the entire curtain
            _paintCurtain(0.5 * Settings.SCREEN_WIDTH, 0.5 * Settings.SCREEN_HEIGHT,
                -0.5 * Settings.displaySize, 0.5 * Settings.displaySize)
            break

        case LevelPhase.ENTERING:
        case LevelPhase.WINNING:
            // Paint the curtain
            paintCurtain(t)
            break

        case LevelPhase.RUNNING:
            // Fade out restartMessage
            if (phaseProgress > 0) {
                paintRestartMessage(phaseProgress / Settings.restartMessageDuration)
            }
            break

        case LevelPhase.FAILING:
            // Paint restartMessage
            paintRestartMessage(1)
            break
    }
}

enterLevel(0)
// First level starts abruptly
state.level.reset() // Usually called by the INITIAL state
enterLevelPhase(LevelPhase.RUNNING)

startMainloop(update, paint)

//#endregion
