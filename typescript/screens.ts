import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { conUI, paintTextBlob, SCREEN_HEIGHT, SCREEN_WIDTH } from './canvas.js'
import { easeOutQuad } from './easing.js'

const failureScreen = new CanvasHandle(document.createElement('canvas'), SCREEN_WIDTH, SCREEN_HEIGHT, function (con) {
    paintTextBlob(con, 0.5 * SCREEN_WIDTH, 0.5 * SCREEN_HEIGHT, 48, 'bold 64', 'Wrong. Again.')
}).canvas

export function paintFailureScreen(opacity: number) {
    // Ease out because we're going in the opposite direction (1 ⏩ 0).
    conUI.globalAlpha = easeOutQuad(opacity)
    conUI.drawImage(failureScreen,
        0, 0, failureScreen.width, failureScreen.height,
        0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
    conUI.globalAlpha = 1
}
