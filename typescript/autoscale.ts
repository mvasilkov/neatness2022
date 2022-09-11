import { AutoScaleWrapper } from '../node_modules/natlib/viewport/AutoScaleWrapper.js'

import { Settings } from './prelude.js'

export const autoscale = new AutoScaleWrapper(document.querySelector('#a')!,
    Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT)

autoscale.addEventListeners()
