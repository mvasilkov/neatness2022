import { Level } from './Level.js'

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
    level: new Level,
    levelPhase: LevelPhase.INITIAL,
}
