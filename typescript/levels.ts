import type { Level } from './Level'
import { Neatness01 } from './levels/Neatness01.js'
import { Neatness02 } from './levels/Neatness02.js'
import { enterLevelPhase, LevelPhase, state } from './state.js'

const LEVEL_CONS: typeof Level[] = [
    Neatness01,
    Neatness02,
]

export function enterLevel(n: number) {
    state.level = new LEVEL_CONS[n]()
    enterLevelPhase(LevelPhase.INITIAL)
}
