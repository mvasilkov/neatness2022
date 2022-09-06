import type { Level } from './Level'

export const enum LevelPhase {
    INITIAL, ENTERING, RUNNING, FAILING, WINNING,
}

interface State {
    levelIndex: number,
    level: Level,
    levelPhase: LevelPhase,
    phaseProgress: number,
    oldProgress: number,
    skullsTurnProgress: number,
    buttonsEnabled: number,
    buttonsPressed: [boolean, boolean, boolean],
    oldPressed: [boolean, boolean, boolean],
    soundEnabled: boolean,
    restartMessage: HTMLCanvasElement | null,
}

export const state: State = {
    levelIndex: 0,
    // @ts-expect-error Type 'null' is not assignable to type 'Level'.
    level: null,
    levelPhase: LevelPhase.INITIAL,
    phaseProgress: 0,
    oldProgress: 0,
    skullsTurnProgress: 0,
    buttonsEnabled: 3,
    buttonsPressed: [false, false, false],
    oldPressed: [false, false, false],
    soundEnabled: true,
    restartMessage: null,
}

export function enterLevelPhase(phase: LevelPhase, initialProgress = 0) {
    state.levelPhase = phase
    state.phaseProgress = state.oldProgress = initialProgress
}
