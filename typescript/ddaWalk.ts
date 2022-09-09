/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { IVec2, Vec2 } from '../node_modules/natlib/Vec2.js'

type TileIntersection = Vec2 & {
    hitDistance?: number,
    hitVerticalSide?: boolean,
}

const ti: TileIntersection = new Vec2

/** Return true to end the walk. */
type WalkFunction = (x: number, y: number, hitDistance: number) => boolean | void

/** Digital differential analyzer (DDA) */
export function ddaWalk(start: Readonly<IVec2>, direction: Readonly<IVec2>, fun: WalkFunction): TileIntersection {
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
    let distance: number

    // Are we on a vertical side
    let vertical: boolean

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
        if (vertical = xlength < ylength) {
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
            ti.hitDistance = distance
            ti.hitVerticalSide = vertical
            return ti.setMultiplyScalar(direction, distance).add(start)
        }
    }
}
