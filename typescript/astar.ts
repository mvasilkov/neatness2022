import { Vec2 } from '../node_modules/natlib/Vec2.js'

class Vec2WithPriority extends Vec2 {
    // Can't change these without invalidating the hash
    declare readonly x: number
    declare readonly y: number

    readonly hash: number
    priority: number

    constructor(x: number, y: number) {
        super(x, y)

        this.hash = this.y << 16 | this.x
        this.priority = 0
    }
}

type WalkFunction = (x: number, y: number) => void

/** Get the neighbourhood of connected points. */
function getConnected(buf: number[][], width: number, height: number, x: number, y: number): Vec2WithPriority[] {
    const connected: Vec2WithPriority[] = []

    // left
    if (x > 0 && buf[y][x - 1] > 9)
        connected.push(new Vec2WithPriority(x - 1, y))
    // top
    if (y > 0 && buf[y - 1][x] > 9)
        connected.push(new Vec2WithPriority(x, y - 1))
    // right
    if (x < width - 1 && buf[y][x + 1] > 9)
        connected.push(new Vec2WithPriority(x + 1, y))
    // bottom
    if (y < height - 1 && buf[y + 1][x] > 9)
        connected.push(new Vec2WithPriority(x, y + 1))

    return connected
}

/** Manhattan distance on a square grid */
function heuristic(x0: number, x1: number, y0: number, y1: number): number {
    return Math.abs(x0 - x1) + Math.abs(y0 - y1)
}
