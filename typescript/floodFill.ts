type UpdateFunction = (x: number, y: number) => void

const enum FillDirection { UP = 1, DOWN, ALL }
// Critical:
// FillDirection.ALL === (FillDirection.UP | FillDirection.DOWN)

/** (x0, x1, y, direction) */
type ScanlineTuple = [number, number, number, FillDirection]

/** Scanline flood fill routine */
export function floodFill<T>(buf: T[][], width: number, height: number, x: number, y: number, updateValue: T, updateFunction: UpdateFunction) {
    // Update buf where buf[y][x] === updateValue, using updateFunction(x, y)

    const stack: ScanlineTuple[] = [
        [x, x, y, FillDirection.ALL],
    ]

    while (stack.length !== 0) {
        let [x0, x1, y, direction] = stack.pop()!

        // Widen the scanline

        // ⏪
        let u0 = x0
        while (u0 >= 0 && buf[y][u0] === updateValue) {
            --u0
        }
        if (++u0 < x0 - 1) {
            direction |= FillDirection.ALL
        }

        // ⏩
        let u1 = x1
        while (u1 < width && buf[y][u1] === updateValue) {
            ++u1
        }
        if (--u1 > x1 + 1) {
            direction |= FillDirection.ALL
        }

        // Fill the scanline

        let run = false
        // Reuse x and x0 variables
        for (x = u0; x <= u1; ++x) {
            if (buf[y][x] === updateValue) {
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
