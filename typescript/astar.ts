import { Vec2 } from '../node_modules/natlib/Vec2.js'

import { PriorityQueue } from './PriorityQueue.js'

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

/** `A*` path finding algorithm */
export function astar(buf: number[][], width: number, height: number, x0: number, y0: number, x1: number, y1: number, walkFunction: WalkFunction) {
    const start = new Vec2WithPriority(x0, y0)
    // Critical default: start.priority = 0

    const frontier = new PriorityQueue<Vec2WithPriority>(
        (a, b) => a.priority - b.priority, // Sort ascending
        [start],
    )

    const previous: { [n: number]: Vec2WithPriority } = Object.create(null)
    const score: { [n: number]: number } = Object.create(null)

    score[start.hash] = 0

    while (frontier.length !== 0) {
        const current = frontier.remove()!

        if (current.x === x1 && current.y === y1) {
            break // Found the path
        }

        for (const next of getConnected(buf, width, height, current.x, current.y)) {
            const nextScore = score[current.hash] + 1
            if (score[next.hash] === undefined || nextScore < score[next.hash]) {
                previous[next.hash] = current
                score[next.hash] = nextScore
                next.priority = nextScore + heuristic(x1, y1, next.x, next.y)
                frontier.insert(next)
            }
        }
    }

    // Walk the path
    let end = new Vec2WithPriority(x1, y1)
    while (previous[end.hash] !== undefined) {
        walkFunction(end.x, end.y)
        end = previous[end.hash]
    }
}

function isTraversable(index: number): boolean {
    return index === 1 || index > 9
}

/** Get the neighbourhood of connected points. */
function getConnected(buf: number[][], width: number, height: number, x: number, y: number): Vec2WithPriority[] {
    const connected: Vec2WithPriority[] = []

    // left
    if (x > 0 && isTraversable(buf[y][x - 1]))
        connected.push(new Vec2WithPriority(x - 1, y))
    // top
    if (y > 0 && isTraversable(buf[y - 1][x]))
        connected.push(new Vec2WithPriority(x, y - 1))
    // right
    if (x < width - 1 && isTraversable(buf[y][x + 1]))
        connected.push(new Vec2WithPriority(x + 1, y))
    // bottom
    if (y < height - 1 && isTraversable(buf[y + 1][x]))
        connected.push(new Vec2WithPriority(x, y + 1))

    return connected
}

/** Manhattan distance on a square grid */
function heuristic(x0: number, x1: number, y0: number, y1: number): number {
    return Math.abs(x0 - x1) + Math.abs(y0 - y1)
}
