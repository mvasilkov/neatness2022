import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { conUI, setFontStyle } from './canvas.js'
import { Settings } from './prelude.js'
import { LevelPhase, state } from './state.js'
import { easeInQuad, easeOutQuad } from './utils.js'

const curtain = new CanvasHandle(document.createElement('canvas'),
    Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT, (con, width, height) => {
        // Colors: https://uigradients.com/#PinotNoir
        const gradient = con.createLinearGradient(0, 0, width, 0)
        gradient.addColorStop(0, '#4b6cb7')
        gradient.addColorStop(1, '#182848')

        con.fillStyle = gradient
        con.fillRect(0, 0, width, height)

        const text = 'only in death does duty end'
        const longText = Array.from({ length: 8 }, () => ' ').join(text)

        setFontStyle(con, '24')
        con.textAlign = 'center'
        con.textBaseline = 'middle'

        const textWidth = con.measureText(text).width
        const Δx = 0.25 * textWidth
        const Δy = 48

        con.fillStyle = '#ffffff80'
        for (let n = -5; n <= 5; ++n) {
            con.fillText(longText, 0.5 * width - Δx * n, 0.5 * height + Δy * n)
        }

        con.fillStyle = '#fff'
        con.fillText(text, 0.5 * width, 0.5 * height)
    }).canvas

export function paintCurtain(t: number) {
    let width: number

    if (state.levelPhase === LevelPhase.ENTERING) {
        width = easeInQuad((state.phaseProgress + 1 - t) / Settings.curtainDuration) * 0.5 * Settings.displaySize

        _paintCurtain(0.5 * Settings.SCREEN_WIDTH, 0.5 * Settings.SCREEN_HEIGHT, -width, width)
    }

    else if (state.levelPhase === LevelPhase.WINNING) {
        width = easeOutQuad((state.phaseProgress - 1 + t) / Settings.curtainDuration) * 0.5 * Settings.displaySize

        _paintCurtain(0, Settings.SCREEN_HEIGHT, width)
        _paintCurtain(Settings.SCREEN_WIDTH, 0, -width)
    }
}

export function _paintCurtain(x: number, y: number, width: number, start = 0) {
    conUI.save()

    conUI.translate(x, y)
    conUI.rotate(-0.5124) // Math.atan2(-540, 960)

    conUI.beginPath()
    conUI.lineTo(start, -500)
    conUI.lineTo(width, -500)
    conUI.lineTo(width, 1000)
    conUI.lineTo(start, 1000)
    conUI.closePath()

    conUI.restore()

    conUI.save()

    conUI.clip()

    conUI.drawImage(curtain, 0, 0, curtain.width, curtain.height,
        0, 0, Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT)

    conUI.restore()
}
