export const enum Settings {
    // Our internal resolution is (420, 270) with PAR of 8:7.
    IR_SCREEN_WIDTH = 420,
    IR_SCREEN_HEIGHT = 270,

    // Internal resolution point size in document pixels
    IR_X = 2 * (8 / 7),
    IR_Y = 2,

    // Actual canvas size
    SCREEN_WIDTH = 960,
    SCREEN_HEIGHT = 540,
    /** Supersampling */
    UPSCALE_FROM_IR = 2,

    /** For how long the 'Wrong. Again.' line is displayed */
    restartMessageDuration = 100, // Ticks, 50 ticks == 1 second
    /** Skulls periodically turn at this rate */
    skullsTurnPeriod = 50,
    /** For how long a skull is facing forward during a turn */
    skullTurnDuration = 9,

    hotspotSpriteSize = 22,
}

/** Painting buffer */
export const painting = Array.from(
    { length: Settings.IR_SCREEN_HEIGHT }, () => Array.from(
        { length: Settings.IR_SCREEN_WIDTH }, () => 0))

//#region Easing

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

//#endregion
