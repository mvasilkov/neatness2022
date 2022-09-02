/*
import { linearSrgbToOklab, oklabToLinearSrgb } from './oklab.js'
import { linearToSrgb, srgbToLinear } from './srgb.js'
*/

// Colors: https://lospec.com/palette-list/blk-neo
export const enum Colors {
    paint = '#ffe091',
    paintA = '#8cff9b',
    paintB = '#78fae6',
    tile = '#eaeae8',

    // Inversion
    paintInversion = '#ebcc7e',
    paintAInversion = '#78eb88',
    paintBInversion = '#62e6d2',
    tileInversion = '#d6d6d4',
}

//#region Derivation
/*
export const colorPaint = '#ffe091'
export const colorPaintA = '#8cff9b'
export const colorPaintB = '#78fae6'
export const colorTile = '#eaeae8'

const colorPaintO = linearSrgbToOklab({
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

const ΔL = -0.06

colorPaintO.L += ΔL
colorPaintAO.L += ΔL
colorPaintBO.L += ΔL
colorTileO.L += ΔL

const colorPaintL = oklabToLinearSrgb(colorPaintO)
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

export const colorPaintInversion = '#' +
    channel(linearToSrgb(colorPaintL.r)) +
    channel(linearToSrgb(colorPaintL.g)) +
    channel(linearToSrgb(colorPaintL.b))

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
*/
//#endregion
