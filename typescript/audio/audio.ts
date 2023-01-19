/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { convertMidiToFrequency } from '../../node_modules/natlib/audio/audio.js'
import { AudioHandle } from '../../node_modules/natlib/audio/AudioHandle.js'
import { Mulberry32 } from '../../node_modules/natlib/prng/Mulberry32.js'

import { Settings } from '../prelude.js'
import { ImpulseResponse } from './ImpulseResponse.js'
import { play } from './song.js'

const TEMPO_MUL = 120 / 70

export const audioHandle = new AudioHandle

let audioOut: GainNode
let songStart: number

export function initializeAudio(con: AudioContext) {
    audioOut = new GainNode(con, { gain: 0.3333 })

    // Reverb
    const convolver = new ConvolverNode(con)
    const reverbDry = new GainNode(con, { gain: 2 / 3 })
    const reverbWet = new GainNode(con, { gain: 1 / 3 })

    audioOut.connect(convolver)
    audioOut.connect(reverbDry)
    convolver.connect(reverbWet)
    reverbDry.connect(con.destination)
    reverbWet.connect(con.destination)

    const ir = new ImpulseResponse(2, con.sampleRate, new Mulberry32(Settings.SCREEN_WIDTH))
    ir.generateReverb(buf => {
        convolver.buffer = buf

        songStart = con.currentTime + 0.05
        // for (let n = 0; n < 4; ++n) {
        //     play((index, start, end) => playNote(index, start + n, end + n), n)
        // }

        enqueue()
        setInterval(enqueue, 999)
    }, 16000, 1000, 2 * TEMPO_MUL, 0.00001, -90)
}

export function toggleAudio(on: boolean) {
    if (audioOut) {
        audioOut.gain.value = on ? 0.3333 : 0
    }
}

function decay(osc: OscillatorNode, start: number) {
    const envelope = new GainNode(audioHandle.con!, { gain: 0.5 })
    envelope.gain.setValueAtTime(0.5, songStart + start)
    envelope.gain.exponentialRampToValueAtTime(0.00001, songStart + start + 2 * TEMPO_MUL)
    osc.connect(envelope)
    return envelope
}

function playNote(n: number, start: number, end: number) {
    start *= TEMPO_MUL
    end *= TEMPO_MUL

    const osc = new OscillatorNode(audioHandle.con!, {
        type: 'square',
        frequency: convertMidiToFrequency(n),
    })
    decay(osc, start).connect(audioOut)
    osc.start(songStart + start)
    osc.stop(songStart + end)
}

let prevPart = -1

function enqueue() {
    let bufferWanted = audioHandle.con!.currentTime - songStart + 4
    let queued = (prevPart + 1) * TEMPO_MUL

    if (queued > bufferWanted) return
    bufferWanted += 4

    while (queued < bufferWanted) {
        const n = ++prevPart
        play((index, start, end) => playNote(index, start + n, end + n), n % 57)

        queued += TEMPO_MUL
    }
}

// Sound effects

export const enum SoundEffect {
    BUTTON_CLICK,
    CONNECTION,
    BAD_CONNECTION,
}

export function sound(effect: SoundEffect) {
    if (!audioOut) return

    switch (effect) {
        case SoundEffect.BUTTON_CLICK:
            playNote2(91, 0, 0.04) // G6
            break

        case SoundEffect.CONNECTION:
            playNote2(79, 0, 0.05) // G5
            playNote2(83, 0.05, 0.05) // B5
            playNote2(88, 0.1, 0.05) // E6
            break

        case SoundEffect.BAD_CONNECTION:
            playNote2(43, 0, 0.2) // G2
            break
    }
}

// This is `playNote()` but for sound effects
function playNote2(n: number, start: number, duration: number) {
    start += audioHandle.con!.currentTime

    const osc = new OscillatorNode(audioHandle.con!, {
        type: 'square',
        frequency: convertMidiToFrequency(n),
    })
    // decay(osc, start).connect(audioOut)
    osc.connect(audioOut)
    osc.start(start)
    osc.stop(start + duration)
}
