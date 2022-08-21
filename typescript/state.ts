import type { Level } from './Level'

export const enum LevelPhase {
    INITIAL, RUNNING, FAILING, WINNING,
}

interface State {
    level: Level,
    levelPhase: LevelPhase,
    phaseProgress: number,
    oldProgress: number,
    skullsTurnProgress: number,
}

export const state: State = {
    // @ts-expect-error Type 'null' is not assignable to type 'Level'.
    level: null,
    levelPhase: LevelPhase.INITIAL,
    phaseProgress: 0,
    oldProgress: 0,
    skullsTurnProgress: 0,
}

export function enterLevelPhase(phase: LevelPhase, initialProgress = 0) {
    state.levelPhase = phase
    state.phaseProgress = state.oldProgress = initialProgress
}
