export function easeInQuad(t: number) {
    return t * t
}

export function easeOutQuad(t: number) {
    return t * (2 - t)
}

export function easeInOutQuad(t: number) {
    return t < 0.5 ?
        2 * t * t :
        2 * t * (2 - t) - 1
}
