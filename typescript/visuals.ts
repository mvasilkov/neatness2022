import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { conUI, paintTextBlob } from './canvas.js'
import { Settings } from './prelude.js'
import { easeOutQuad } from './utils.js'

const restartMessage = new CanvasHandle(document.createElement('canvas'), Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT, function (con) {
    paintTextBlob(con, 0.5 * Settings.SCREEN_WIDTH, 0.5 * Settings.SCREEN_HEIGHT, 64, 'bold 64', 'Wrong. Again.')
}).canvas

export function paintRestartMessage(opacity: number) {
    // Ease out because we're going in the opposite direction (1 ⏩ 0).
    conUI.globalAlpha = easeOutQuad(opacity)
    conUI.drawImage(restartMessage,
        0, 0, restartMessage.width, restartMessage.height,
        0, 0, Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT)
    conUI.globalAlpha = 1
}

export const reflection = new CanvasHandle(document.createElement('canvas'), 0.5 * Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT, (con, width, heigth) => {
    const gradient1 = con.createRadialGradient(0, 0, 0, 0, 0, width)
    gradient1.addColorStop(0, '#ffffff40')
    gradient1.addColorStop(0.8, '#ffffff00')

    con.fillStyle = gradient1
    con.fillRect(0, 0, width, heigth)

    const gradient2 = con.createLinearGradient(0, 0, width, 0.087 * width)
    gradient2.addColorStop(0, '#ffffff00')
    gradient2.addColorStop(0.3333, '#ffffff20')
    gradient2.addColorStop(0.3334, '#ffffff00')

    con.fillStyle = gradient2
    con.fillRect(0, 0, width, heigth)

    con.beginPath()
    con.lineTo(0, 0)
    con.lineTo(0, Settings.SCREEN_HEIGHT)
    con.strokeStyle = '#ffffff40'
    con.stroke()
}).canvas
