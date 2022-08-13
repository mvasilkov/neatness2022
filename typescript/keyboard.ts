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
    if (keydown &&
        (event.altKey || event.ctrlKey || event.metaKey || event.repeat)) {
        // Don't react to keyboard shortcuts and repeating keys.
        return
    }
    let a: KeyAction
    if (a = keyboardEventActions[event.code]) {
        controls[a[0]][a[1]] = keydown
        // event.preventDefault()
    }
}

export function addKeyboardEventListeners(target: GlobalEventHandlers) {
    target.addEventListener('keydown', event => updateControls(event, true))
    target.addEventListener('keyup', event => updateControls(event, false))
}
