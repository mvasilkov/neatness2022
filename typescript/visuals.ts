import { conUI, paintTextBlob } from './canvas.js'
import { Settings } from './prelude.js'
import { easeOutQuad } from './utils.js'

export function paintRestartMessage(opacity: number) {
    // Ease out because we're going in the opposite direction (1 ⏩ 0).
    conUI.globalAlpha = easeOutQuad(opacity)

    paintTextBlob(conUI,
        0.5 * Settings.SCREEN_WIDTH,
        0.5 * Settings.SCREEN_HEIGHT,
        64, 'bold 64', '#ff0040', 'Not like this')

    conUI.globalAlpha = 1
}
