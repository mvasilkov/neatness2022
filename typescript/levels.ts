import type { Level } from './Level'
import { Neatness01 } from './levels/Neatness01.js'
import { Neatness02 } from './levels/Neatness02.js'
import { Neatness03 } from './levels/Neatness03.js'
import { NeatnessH01 } from './levels/NeatnessH01.js'
import { NeatnessH02 } from './levels/NeatnessH02.js'
import { NeatnessH03 } from './levels/NeatnessH03.js'
import { NeatnessM01 } from './levels/NeatnessM01.js'
import { NeatnessM02 } from './levels/NeatnessM02.js'
import { NeatnessM03 } from './levels/NeatnessM03.js'
import { NeatnessR01 } from './levels/NeatnessR01.js'
import { NeatnessR02 } from './levels/NeatnessR02.js'
import { NeatnessR03 } from './levels/NeatnessR03.js'
import { NeatnessR04 } from './levels/NeatnessR04.js'
import { NeatnessR05 } from './levels/NeatnessR05.js'
import { NeatnessR06 } from './levels/NeatnessR06.js'
import { enterLevelPhase, LevelPhase, state } from './state.js'

const LEVEL_CONS: typeof Level[] = [
    // The Neatness
    Neatness01,
    Neatness02,
    Neatness03,
    NeatnessM01,
    NeatnessM02,
    NeatnessM03,
    // The Reflectance
    NeatnessR01,
    NeatnessR02,
    NeatnessR03,
    NeatnessR04,
    NeatnessR05,
    NeatnessR06,
    // The Hotness
    NeatnessH01,
    NeatnessH02,
    NeatnessH03,
]

export function enterLevel(n: number) {
    state.level = new LEVEL_CONS[n]()
    enterLevelPhase(LevelPhase.INITIAL)
}
