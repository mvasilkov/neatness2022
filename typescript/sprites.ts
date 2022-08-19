import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'

// Skull: 11 by 11, 2-bit
// 0) Transparent
// 1) Outline
// 2) Main color
// 3) Shading
const spriteSkull = [
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

const paletteSkull = [
    '#0000',
    '#101010',
    '#dbcfb1',
    '#a9a48d',
]

function getRenderingFunction(sprite: number[], width: number, palette: string[], scale: number, flip = false) {
    return function (con: CanvasRenderingContext2D) {
        con.scale(scale, scale)
        con.clearRect(0, 0, width, sprite.length)

        for (let y = 0; y < sprite.length; ++y) {
            for (let x = 0; x < width; ++x) {
                const index = sprite[y] >> 2 * (flip ? x : width - 1 - x) & 3

                con.fillStyle = palette[index]
                con.fillRect(x, y, 1, 1)
            }
        }
    }
}

export const skull = [
    // left
    new CanvasHandle(document.createElement('canvas'), 99, 99, getRenderingFunction(spriteSkull, 11, paletteSkull, 9)).canvas,
    // front
    new CanvasHandle(document.createElement('canvas'), 99, 99, getRenderingFunction(spriteSkullFront, 11, paletteSkull, 9)).canvas,
    // right
    new CanvasHandle(document.createElement('canvas'), 99, 99, getRenderingFunction(spriteSkull, 11, paletteSkull, 9, true)).canvas,
]
