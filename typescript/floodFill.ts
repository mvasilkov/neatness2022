/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
type UpdateFunction = (x: number, y: number) => void

const enum FillDirection { UP = 1, DOWN, ALL }
// Critical:
// FillDirection.ALL === (FillDirection.UP | FillDirection.DOWN)

/** (x0, x1, y, direction) */
type ScanlineTuple = [number, number, number, FillDirection]

/** Scanline flood fill routine */
export function floodFill<T>(buf: T[][], width: number, height: number, x: number, y: number, updateValue: (value: T) => boolean, updateFunction: UpdateFunction) {
    // Update buf where updateValue(buf[y][x]) === true, using updateFunction(x, y)

    const stack: ScanlineTuple[] = [
        [x, x, y, FillDirection.ALL],
    ]

    while (stack.length !== 0) {
        let [x0, x1, y, direction] = stack.pop()!

        // Widen the scanline

        // ⏪
        let u0 = x0
        while (u0 >= 0 && updateValue(buf[y][u0])) {
            --u0
        }
        if (++u0 < x0 - 1) {
            direction |= FillDirection.ALL
        }

        // ⏩
        let u1 = x1
        while (u1 < width && updateValue(buf[y][u1])) {
            ++u1
        }
        if (--u1 > x1 + 1) {
            direction |= FillDirection.ALL
        }

        // Fill the scanline

        let run = false
        // Reuse x and x0 variables
        for (x = u0; x <= u1; ++x) {
            if (updateValue(buf[y][x])) {
                updateFunction(x, y)

                if (!run) {
                    run = true
                    x0 = x
                }
            }
            else {
                if (run) {
                    run = false
                    push(x0, x - 1, y, direction)
                }
            }
        }

        if (run) push(x0, u1, y, direction)
    }

    function push(u0: number, u1: number, y: number, direction: FillDirection) {
        // ⬆️
        if ((direction & FillDirection.UP) && (y > 0)) {
            stack.push([u0, u1, y - 1, FillDirection.UP])
        }

        // ⬇️
        if ((direction & FillDirection.DOWN) && (y < height - 1)) {
            stack.push([u0, u1, y + 1, FillDirection.DOWN])
        }
    }
}
