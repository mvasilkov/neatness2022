import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

import { paintTextBlob, SCREEN_HEIGHT, SCREEN_WIDTH } from './canvas.js'

export const failureScreen = new CanvasHandle(document.createElement('canvas'), SCREEN_WIDTH, SCREEN_HEIGHT, function (con) {
    paintTextBlob(con, 0.5 * SCREEN_WIDTH, 0.5 * SCREEN_HEIGHT, 48, 'bold 48', 'Wrong. Again.')
}).canvas
