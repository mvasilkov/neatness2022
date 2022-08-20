import type { Level } from './Level'
import { Neatness01 } from './levels/Neatness01.js'

export const LEVELS = [
    Neatness01,
]

export const enum LevelPhase {
    INITIAL,
    RUNNING,
    FAILING,
    WINNING,
}

export const FAILURE_ENTER_DURATION = 0 // Ticks, 50 ticks == 1 second
export const FAILURE_EXIT_DURATION = 100

interface State {
    level: Level,
    levelPhase: LevelPhase,
    phaseProgress: number,
    oldProgress: number,
    failureScreen: HTMLCanvasElement | null,
}

export const state: State = {
    level: new LEVELS[0],
    levelPhase: LevelPhase.INITIAL,
    phaseProgress: 0,
    oldProgress: 0,
    failureScreen: null,
}

export function enterLevelPhase(phase: LevelPhase, initialProgress = 0) {
    state.levelPhase = phase
    state.phaseProgress = state.oldProgress = initialProgress
}
