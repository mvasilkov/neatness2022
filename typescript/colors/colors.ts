/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
// import { linearSrgbToOklab, oklabToLinearSrgb } from './oklab.js'
// import { linearToSrgb, srgbToLinear } from './srgb.js'

// Colors: https://lospec.com/palette-list/blk-neo
export const enum Colors {
    paint = '#f7c5ff',
    paintConnected = '#ffe091',
    paintA = '#8cff9b',
    paintB = '#78fae6',
    tile = '#eaeae8',

    // Inversion
    paintInversion = '#e3b1ff',
    paintConnectedInversion = '#ebcc7e',
    paintAInversion = '#78eb88',
    paintBInversion = '#62e6d2',
    tileInversion = '#d6d6d4',
}

//#region Derivation
/*
export const colorPaint = '#b483ef'
export const colorPaintConnected = '#ffe091'
export const colorPaintA = '#8cff9b'
export const colorPaintB = '#78fae6'
export const colorTile = '#eaeae8'

const colorPaintO = linearSrgbToOklab({
    r: srgbToLinear(0xb4 / 0xff),
    g: srgbToLinear(0x83 / 0xff),
    b: srgbToLinear(0xef / 0xff),
})

const colorPaintConnectedO = linearSrgbToOklab({
    r: srgbToLinear(0xff / 0xff),
    g: srgbToLinear(0xe0 / 0xff),
    b: srgbToLinear(0x91 / 0xff),
})

const colorPaintAO = linearSrgbToOklab({
    r: srgbToLinear(0x8c / 0xff),
    g: srgbToLinear(0xff / 0xff),
    b: srgbToLinear(0x9b / 0xff),
})

const colorPaintBO = linearSrgbToOklab({
    r: srgbToLinear(0x78 / 0xff),
    g: srgbToLinear(0xfa / 0xff),
    b: srgbToLinear(0xe6 / 0xff),
})

const colorTileO = linearSrgbToOklab({
    r: srgbToLinear(0xea / 0xff),
    g: srgbToLinear(0xea / 0xff),
    b: srgbToLinear(0xe8 / 0xff),
})

// Update paint color's L
colorPaintO.L = (colorPaintAO.L + colorPaintBO.L) / 2

const colorPaintUpdatedL = oklabToLinearSrgb(colorPaintO)

const ΔL = -0.06

colorPaintO.L += ΔL
colorPaintConnectedO.L += ΔL
colorPaintAO.L += ΔL
colorPaintBO.L += ΔL
colorTileO.L += ΔL

const colorPaintL = oklabToLinearSrgb(colorPaintO)
const colorPaintConnectedL = oklabToLinearSrgb(colorPaintConnectedO)
const colorPaintAL = oklabToLinearSrgb(colorPaintAO)
const colorPaintBL = oklabToLinearSrgb(colorPaintBO)
const colorTileL = oklabToLinearSrgb(colorTileO)

function channel(n: number): string {
    if (n < 0) n = 0
    else if (n > 1) n = 1
    const result = Math.round(255 * n).toString(16)
    if (result.length === 1) return '0' + result
    return result
}

export const colorPaintUpdated = '#' +
    channel(linearToSrgb(colorPaintUpdatedL.r)) +
    channel(linearToSrgb(colorPaintUpdatedL.g)) +
    channel(linearToSrgb(colorPaintUpdatedL.b))

export const colorPaintInversion = '#' +
    channel(linearToSrgb(colorPaintL.r)) +
    channel(linearToSrgb(colorPaintL.g)) +
    channel(linearToSrgb(colorPaintL.b))

export const colorPaintConnectedInversion = '#' +
    channel(linearToSrgb(colorPaintConnectedL.r)) +
    channel(linearToSrgb(colorPaintConnectedL.g)) +
    channel(linearToSrgb(colorPaintConnectedL.b))

export const colorPaintAInversion = '#' +
    channel(linearToSrgb(colorPaintAL.r)) +
    channel(linearToSrgb(colorPaintAL.g)) +
    channel(linearToSrgb(colorPaintAL.b))

export const colorPaintBInversion = '#' +
    channel(linearToSrgb(colorPaintBL.r)) +
    channel(linearToSrgb(colorPaintBL.g)) +
    channel(linearToSrgb(colorPaintBL.b))

export const colorTileInversion = '#' +
    channel(linearToSrgb(colorTileL.r)) +
    channel(linearToSrgb(colorTileL.g)) +
    channel(linearToSrgb(colorTileL.b))

console.log(`paint = '${colorPaintUpdated}',`)
console.log(`paintInversion = '${colorPaintInversion}',`)
console.log(`paintConnectedInversion = '${colorPaintConnectedInversion}',`)
console.log(`paintAInversion = '${colorPaintAInversion}',`)
console.log(`paintBInversion = '${colorPaintBInversion}',`)
console.log(`tileInversion = '${colorTileInversion}',`)
*/
//#endregion
