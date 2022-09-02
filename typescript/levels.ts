import type { Level } from './Level'
import { Neatness01 } from './levels/Neatness01.js'
import { Neatness02 } from './levels/Neatness02.js'
import { NeatnessM01 } from './levels/NeatnessM01.js'
import { NeatnessR01 } from './levels/NeatnessR01.js'
import { NeatnessR02 } from './levels/NeatnessR02.js'
import { enterLevelPhase, LevelPhase, state } from './state.js'

const LEVEL_CONS: typeof Level[] = [
    // The Neatness
    Neatness01,
    Neatness02,
    NeatnessM01,
    // The Reflectance
    NeatnessR01,
    NeatnessR02,
    // The Hotness
]

export function enterLevel(n: number) {
    state.level = new LEVEL_CONS[n]()
    enterLevelPhase(LevelPhase.INITIAL)
}
