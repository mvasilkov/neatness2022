/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
export const enum Settings {
    // Our internal resolution is (420, 270) with PAR of 8:7.
    IR_SCREEN_WIDTH = 420,
    IR_SCREEN_HEIGHT = 270,

    // Internal resolution point size in document pixels
    IR_X = 2 * (8 / 7),
    IR_Y = 2,

    // Tiles
    TILE_WIDTH = 7,
    TILE_HEIGHT = 8,

    // Actual canvas size
    SCREEN_WIDTH = 960,
    SCREEN_HEIGHT = 540,
    /** Supersampling */
    UPSCALE_FROM_IR = 2,
    SUPERSAMPLING = 2,

    /** For how long the 'Not like this' line is displayed */
    restartMessageDuration = 125, // Ticks, 50 ticks == 1 second
    /** Skulls periodically turn at this rate */
    skullsTurnPeriod = 50,
    /** For how long a skull is facing forward during a turn */
    skullTurnDuration = 9,

    hotspotRx = Settings.TILE_WIDTH,
    hotspotRy = Settings.TILE_HEIGHT,
    hotspotSpriteSize = 22,

    fungusLifeExpectancy = 32,

    // Toolbar
    buttonWidth = 15,
    buttonHeight = 18,

    // Curtain
    displaySize = 1102, // Math.ceil((SCREEN_WIDTH ** 2 + SCREEN_HEIGHT ** 2) ** 0.5)
    curtainDuration = 48,

    // Level select
    totalLevels = 16,
    levelSelectIndex = 21,
}

/** Painting buffer */
export const painting = Array.from(
    { length: Settings.IR_SCREEN_HEIGHT }, () => Array.from(
        { length: Settings.IR_SCREEN_WIDTH }, () => 0))

export const oldPainting = Array.from(
    { length: Settings.IR_SCREEN_HEIGHT }, () => Array.from(
        { length: Settings.IR_SCREEN_WIDTH }, () => 0))
