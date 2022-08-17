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

interface State {
    level: Level,
    levelPhase: LevelPhase,
}

export const state: State = {
    level: new LEVELS[0],
    levelPhase: LevelPhase.INITIAL,
}
