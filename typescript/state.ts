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

export const FAILURE_DURATION = 100 // Ticks, 50 ticks == 1 second

interface State {
    level: Level,
    levelPhase: LevelPhase,
    phaseProgress: number,
    oldProgress: number,
}

export const state: State = {
    level: new LEVELS[0],
    levelPhase: LevelPhase.INITIAL,
    phaseProgress: 0,
    oldProgress: 0,
}

export function enterLevelPhase(phase: LevelPhase, initialProgress = 0) {
    state.levelPhase = phase
    state.phaseProgress = state.oldProgress = initialProgress
}
