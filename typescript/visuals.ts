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
