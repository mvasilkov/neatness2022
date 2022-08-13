import { IVec2, Vec2 } from '../node_modules/natlib/Vec2.js'

class TileIntersection extends Vec2 {
    hitDistance: number

    constructor(x: number, y: number, hitDistance: number) {
        super(x, y)

        this.hitDistance = hitDistance
    }
}

/** Return true to end the walk. */
type WalkFunction = (x: number, y: number, hitDistance: number) => boolean

/** Digital differential analyzer (DDA) */
export function ddaWalk(start: Readonly<IVec2>, direction: Readonly<IVec2>, fun: WalkFunction) {
    // Scaling factor
    const Δx = Math.abs(1 / direction.x)
    const Δy = Math.abs(1 / direction.y)

    // Which tile we're in
    let xtile = Math.floor(start.x)
    let ytile = Math.floor(start.y)

    // Ray length
    let xlength: number, ylength: number

    // Step direction (either +1 or -1)
    let xdir: 1 | -1, ydir: 1 | -1

    // View plane distance
    let distance = 0

    if (direction.x < 0) {
        xdir = -1
        xlength = (start.x - xtile) * Δx
    }
    else {
        xdir = 1
        xlength = (xtile + 1 - start.x) * Δx
    }

    if (direction.y < 0) {
        ydir = -1
        ylength = (start.y - ytile) * Δy
    }
    else {
        ydir = 1
        ylength = (ytile + 1 - start.y) * Δy
    }

    while (true) {
        // Walk along the shortest path
        if (xlength < ylength) {
            xtile += xdir
            distance = xlength
            xlength += Δx
        }
        else {
            ytile += ydir
            distance = ylength
            ylength += Δy
        }

        if (fun(xtile, ytile, distance)) {
            const ti = new TileIntersection(
                start.x + direction.x * distance,
                start.y + direction.y * distance,
                distance)
            return ti
        }
    }
}
