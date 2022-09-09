/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */

// Easing

export function easeInQuad(t: number): number {
    return t * t
}

export function easeOutQuad(t: number): number {
    return t * (2 - t)
}

export function easeInOutQuad(t: number): number {
    return t < 0.5 ?
        2 * t * t :
        2 * t * (2 - t) - 1
}
