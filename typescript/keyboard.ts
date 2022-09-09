/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
export const enum Action { LEFT, UP, RIGHT, DOWN }

type Player = 0 | 1

type KeyAction = [Player, Action]

const keyboardEventActions: { [code: string]: KeyAction } = {
    // Arrow keys (player 1)
    'ArrowLeft': [1, Action.LEFT],
    'ArrowUp': [1, Action.UP],
    'ArrowRight': [1, Action.RIGHT],
    'ArrowDown': [1, Action.DOWN],
    // WASD (player 0)
    'KeyA': [0, Action.LEFT],
    'KeyW': [0, Action.UP],
    'KeyD': [0, Action.RIGHT],
    'KeyS': [0, Action.DOWN],
}

export const controls = [
    [false, false, false, false],
    [false, false, false, false],
]

function updateControls(event: KeyboardEvent, keydown: boolean) {
    if (keydown && (event.altKey || event.ctrlKey || event.metaKey)) {
        // Don't respond to keyboard shortcuts
        return
    }
    let a: KeyAction
    if (a = keyboardEventActions[event.code]) {
        if (!event.repeat) {
            // Repeating keys don't change the state,
            // but still prevent the default action.
            controls[a[0]][a[1]] = keydown
        }
        event.preventDefault()
    }
}

document.addEventListener('keydown', event => updateControls(event, true))
document.addEventListener('keyup', event => updateControls(event, false))
