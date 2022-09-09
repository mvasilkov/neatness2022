/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
type AudioInitializationFunction = (con: AudioContext) => void

export class AudioHandle {
    con: AudioContext | null
    initialized: boolean

    constructor() {
        this.con = null
        this.initialized = false
    }

    async initialize(ini: AudioInitializationFunction) {
        if (this.initialized) return

        if (this.con === null) {
            this.con = new AudioContext // { latencyHint: 'interactive' }
        }

        if (this.con.state === 'suspended') {
            try {
                await this.con.resume()
            }
            catch (err) {
                return
            }
            // Multiple initialize() calls can eventually get here.
            if (this.initialized) return
        }

        if (this.con.state === 'suspended') return

        ini(this.con) // Can't be async

        this.initialized = true
    }
}
