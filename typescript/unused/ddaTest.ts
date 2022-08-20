import { startMainloop } from '../../node_modules/natlib/scheduling/mainloop.js'
import { Vec2 } from '../../node_modules/natlib/Vec2.js'

import { canvasUI, conUI } from '../canvas.js'
import { ddaWalk } from '../ddaWalk.js'
import { Action, controls } from '../keyboard.js'

const MAP_WIDTH = 10
const MAP_HEIGHT = 10
const MOVE_SPEED = 0.05

const tiles = Array.from({ length: MAP_HEIGHT }, () => Array.from({ length: MAP_WIDTH }, () => false))

const startPoint = new Vec2(0.5, 0.5)
const endPoint = new Vec2(MAP_WIDTH - 0.5, MAP_HEIGHT - 0.5)
const direction = new Vec2

function update() {
    // Start point
    if (controls[0][Action.LEFT]) {
        startPoint.x -= MOVE_SPEED
    }
    if (controls[0][Action.UP]) {
        startPoint.y -= MOVE_SPEED
    }
    if (controls[0][Action.RIGHT]) {
        startPoint.x += MOVE_SPEED
    }
    if (controls[0][Action.DOWN]) {
        startPoint.y += MOVE_SPEED
    }
    // End point
    if (controls[1][Action.LEFT]) {
        endPoint.x -= MOVE_SPEED
    }
    if (controls[1][Action.UP]) {
        endPoint.y -= MOVE_SPEED
    }
    if (controls[1][Action.RIGHT]) {
        endPoint.x += MOVE_SPEED
    }
    if (controls[1][Action.DOWN]) {
        endPoint.y += MOVE_SPEED
    }
}

function paint() {
    conUI.clearRect(0, 0, canvasUI.width, canvasUI.height)

    for (let x = 0; x < MAP_WIDTH; ++x) {
        for (let y = 0; y < MAP_HEIGHT; ++y) {
            tiles[y][x] = false
        }
    }

    direction.copy(endPoint).subtract(startPoint)

    // DDA
    // @ts-expect-error Not all code paths return a value.
    const ti = ddaWalk(startPoint, direction, function (x, y) {
        if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) {
            return true // Out of bounds, stop
        }
        tiles[y][x] = true
        if (x === Math.floor(endPoint.x) && y === Math.floor(endPoint.y)) {
            return true // Got to the end, stop
        }
    })

    // Tiles
    for (let y = 0; y < MAP_HEIGHT; ++y) {
        for (let x = 0; x < MAP_WIDTH; ++x) {
            conUI.fillStyle = tiles[y][x] ? '#fff' : '#000'
            conUI.fillRect(x * 32, y * 32, 32, 32)
        }
    }

    const angle = Math.atan2(direction.y, direction.x)
    const distance = Math.sqrt(startPoint.distanceSquared(endPoint))

    // Dotted line
    conUI.fillStyle = '#fdbd8f'
    for (let n = 0; n < distance * 8; ++n) {
        const x = startPoint.x * 32 + 4 * n * Math.cos(angle)
        const y = startPoint.y * 32 + 4 * n * Math.sin(angle)
        conUI.fillRect(x - 1, y - 1, 2, 2)
    }

    // Start point
    conUI.fillStyle = '#fb3b64'
    conUI.fillRect(startPoint.x * 32 - 5, startPoint.y * 32 - 5, 10, 10)

    // End point
    conUI.fillStyle = '#b3e363'
    conUI.fillRect(endPoint.x * 32 - 5, endPoint.y * 32 - 5, 10, 10)

    // Tile intersection
    conUI.beginPath()
    conUI.arc(ti.x * 32, ti.y * 32, 5, 0, 2 * Math.PI)
    if (ti.hitVerticalSide) {
        conUI.fillStyle = '#f87b1b'
        conUI.fill()
    }
    else {
        conUI.strokeStyle = '#f87b1b'
        conUI.stroke()
    }
}

startMainloop(update, paint)
