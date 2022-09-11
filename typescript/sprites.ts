/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import { Colors } from './colors/colors.js'

// Skull: 11 by 11, 2-bit
// 0) Transparent
// 1) Outline
// 2) Main color
// 3) Shading
const spriteSkullLeft = [
    0b0000010101010101010000,
    0b0001011111111111010100,
    0b0101101010101011110101,
    0b0110101010101010111101,
    0b0110101010101010101101,
    0b0101011010100101101101,
    0b0101011001100101101101,
    0b0110101010101010100101,
    0b0101101010101001010101,
    0b0001100110011001010100,
    0b0001010101010101010000,
]
const spriteSkullFront = [
    0b0000010101010101010000,
    0b0001011111111111010100,
    0b0101111010101010110101,
    0b0111101010101010101101,
    0b0110101010101010101001,
    0b0110010110101001011001,
    0b0110010110011001011001,
    0b0110101010101010101001,
    0b0101011010101010010101,
    0b0001011001100110010100,
    0b0000010101010101010000,
]

// Grave: 11 by 11, 2-bit
// 0) Transparent
// 1) Outline
// 2) Main color
// 3) Shading
const spriteGrave = [
    0b0000000101010101000000,
    0b0000010111111101010000,
    0b0001011010011111010100,
    0b0001101001010111110100,
    0b0001101010011010110100,
    0b0001101010011010110100,
    0b0001101010101010110100,
    0b0001101010101010110100,
    0b0001101010101010110100,
    0b0001101010101010110100,
    0b0001010101010101010100,
]

// Princess: 17 by 14, 2-bit
// 0) Transparent
// 1) Outline
// 2) Hair
// 3) Skin
const spritePrincess = [
    0b0000000000000000010001000100000000,
    0b0000000000000001010101010101000000,
    0b0000000000000101010101010101010000,
    0b0000000001011010010101010110010000,
    0b0000000110101010101010101010100100,
    0b0101011010101010101010101010100100,
    0b0110101010101010010110100101101001,
    0b0001101010101001011101011101101001,
    0b0110101001010111111111111111011001,
    0b0001101001110111110111110111010100,
    0b0001101001111111110111110111010000,
    0b0110101010010111111111111111010000,
    0b0110011010100101111111111101010000,
    0b0101000101010001010101010101000000,
]

// Crown: 7 by 3, 2-bit
// 0) Transparent
// 1) Outline
// 2) Main color
const spriteCrown = [
    0b00010001000100,
    0b01100110011001,
    0b01101010101001,
]

// Colors: https://lospec.com/palette-list/twilioquest-76
const paletteSkull = [
    '#0000',
    '#101010',
    '#dbcfb1',
    '#a9a48d',
]

const paletteGrave = [
    '#0000',
    '#101010',
    '#a9a48d',
    '#dbcfb1',
]

const palettePrincess = [
    '#0000',
    '#101010',
    '#ffe08b',
    '#fdbd8f',
]

const paletteCrown = [
    '#0000',
    '#101010',
    Colors.paintB,
]

function getRenderingFunction(sprite: number[], width: number, palette: string[], scale: number, flip = false) {
    return function (con: CanvasRenderingContext2D) {
        con.scale(scale, scale)

        for (let y = 0; y < sprite.length; ++y) {
            for (let x = 0; x < width; ++x) {
                const index = sprite[y] / 4 ** (flip ? x : width - 1 - x) & 3

                con.fillStyle = palette[index]
                con.fillRect(x, y, 1, 1)
            }
        }
    }
}

export const skulls = [
    // left
    new CanvasHandle(null, 99, 99, getRenderingFunction(spriteSkullLeft, 11, paletteSkull, 9)).canvas,
    // front
    new CanvasHandle(null, 99, 99, getRenderingFunction(spriteSkullFront, 11, paletteSkull, 9)).canvas,
    // right
    new CanvasHandle(null, 99, 99, getRenderingFunction(spriteSkullLeft, 11, paletteSkull, 9, true)).canvas,
]

export const grave =
    new CanvasHandle(null, 99, 99, getRenderingFunction(spriteGrave, 11, paletteGrave, 9)).canvas

export const princess =
    new CanvasHandle(null, 17 * 9, 14 * 9, con => {
        // Paint princess
        con.save()

        getRenderingFunction(spritePrincess, 17, palettePrincess, 9)(con)

        con.restore()

        // Paint crown
        con.translate(7 * 9, 0)

        getRenderingFunction(spriteCrown, 7, paletteCrown, 9)(con)
    }).canvas

export const princessSkull =
    new CanvasHandle(null, 99, 14 * 9, con => {
        // Paint skull
        const skull = skulls[2]
        con.drawImage(skull,
            0, 0, skull.width, skull.height,
            0, 3 * 9, 99, 99)

        // Paint crown
        con.translate(2 * 9, 0)

        getRenderingFunction(spriteCrown, 7, paletteCrown, 9)(con)
    }).canvas
