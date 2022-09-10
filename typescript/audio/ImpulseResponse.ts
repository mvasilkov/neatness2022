/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { getPCM } from '../../node_modules/natlib/audio/audio.js'
import { IPrng32 } from '../../node_modules/natlib/prng/prng.js'
import { randomClosedUnit1Ball } from '../../node_modules/natlib/prng/sampling.js'

/** Convert decibels to power ratio. */
export function convertDecibelsToPowerRatio(decibels: number) {
    return 10 ** (decibels / 10)
}

/** Callback function type */
type AudioCallback = (buf: AudioBuffer) => void

/** Impulse response class */
export class ImpulseResponse {
    readonly channels: number
    readonly sampleRate: number
    prng: IPrng32

    constructor(channels: number, sampleRate: number, prng: IPrng32) {
        this.channels = channels
        this.sampleRate = sampleRate
        this.prng = prng
    }

    /** Get a reverb impulse response. */
    generateReverb(
        done: AudioCallback,
        startFrequency: number,
        endFrequency: number,
        duration: number,
        fadeIn = 0,
        decayThreshold = -60,
    ) {
        const length = Math.round(duration * this.sampleRate)
        const fadeInLength = Math.round(fadeIn * this.sampleRate)

        const decay = convertDecibelsToPowerRatio(decayThreshold) ** (1 / (length - 1))
        const fade = 1 / (fadeInLength - 1)

        const buf = new AudioBuffer({
            length,
            numberOfChannels: this.channels,
            sampleRate: this.sampleRate,
        })

        for (const ch of getPCM(buf)) {
            for (let n = 0; n < length; ++n) {
                ch[n] = randomClosedUnit1Ball(this.prng) * decay ** n
            }
            for (let n = 0; n < fadeInLength; ++n) {
                ch[n] *= fade * n
            }
        }

        applyGradualLowpass(done, buf, startFrequency, endFrequency, duration)
    }
}

/** Apply a lowpass filter to the AudioBuffer. */
export function applyGradualLowpass(
    done: AudioCallback,
    buf: AudioBuffer,
    startFrequency: number,
    endFrequency: number,
    duration: number,
) {
    const audioContext = new OfflineAudioContext(buf.numberOfChannels,
        buf.length, buf.sampleRate)

    const filter = new BiquadFilterNode(audioContext, {
        type: 'lowpass',
        Q: 0.0001,
        frequency: startFrequency,
    })
    filter.connect(audioContext.destination)
    filter.frequency.exponentialRampToValueAtTime(endFrequency, duration)

    const player = new AudioBufferSourceNode(audioContext, {
        buffer: buf,
    })
    player.connect(filter)
    player.start()

    audioContext.oncomplete = event => {
        done(event.renderedBuffer)
    }
    audioContext.startRendering()
}
