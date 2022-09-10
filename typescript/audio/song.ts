/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */

type PlayNoteFunction = (index: number, start: number, end: number) => void

/* Magical Power of the Mallet by ZUN
 * Transcribed by MTSranger
 * Edited by Mark Vasilkov
 */
export function play(note: PlayNoteFunction, bar: number) {
    switch (bar) {
        case 0: // half-bar 1
        case 8: // half-bar 9 dedup
            note(64, 0.0, 0.5)
            note(40, 0.0, 0.25)
            note(67, 0.04, 0.5)
            note(71, 0.08, 0.5)
            note(76, 0.12, 0.5)
            note(47, 0.25, 0.5)
            note(71, 0.5, 1.25)
            note(52, 0.5, 0.75)
            note(55, 0.75, 1.0)
            break

        case 1: // half-bar 2
        case 9: // half-bar 10 dedup
            note(59, 0.0, 0.25)
            note(76, 0.25, 0.5)
            note(55, 0.25, 0.5)
            note(78, 0.5, 0.75)
            note(52, 0.5, 0.75)
            note(79, 0.75, 1.0)
            note(47, 0.75, 1.0)
            break

        case 2: // half-bar 3
        case 10: // half-bar 11 dedup
            note(69, 0.0, 0.5)
            note(45, 0.0, 0.25)
            note(72, 0.04, 0.5)
            note(76, 0.08, 0.5)
            note(81, 0.12, 0.5)
            note(52, 0.25, 0.5)
            note(76, 0.5, 1.25)
            note(57, 0.5, 0.75)
            note(60, 0.75, 1.0)
            break

        case 3: // half-bar 4
        case 11: // half-bar 12 dedup
            note(64, 0.0, 0.25)
            note(81, 0.25, 0.5)
            note(60, 0.25, 0.5)
            note(83, 0.5, 0.75)
            note(57, 0.5, 0.75)
            note(86, 0.75, 1.0)
            note(52, 0.75, 1.0)
            break

        case 4: // half-bar 5
        case 12: // half-bar 13 dedup
            note(69, 0.0, 0.75)
            note(50, 0.0, 0.25)
            note(74, 0.04, 0.75)
            note(78, 0.08, 0.75)
            note(81, 0.12, 0.75)
            note(57, 0.25, 0.5)
            note(62, 0.5, 0.75)
            note(79, 0.75, 1.0)
            note(66, 0.75, 1.0)
            break

        case 5: // half-bar 6
        case 13: // half-bar 14 dedup
            note(78, 0.0, 0.25)
            note(69, 0.0, 0.25)
            note(79, 0.25, 0.375)
            note(66, 0.25, 0.5)
            note(78, 0.375, 0.625)
            note(62, 0.5, 0.75)
            note(74, 0.625, 1.0)
            note(57, 0.75, 1.0)
            break

        case 6: // half-bar 7
            note(59, 0.0, 1.0)
            note(35, 0.0, 0.25)
            note(63, 0.04, 1.0)
            note(66, 0.08, 1.0)
            note(71, 0.12, 1.0)
            note(42, 0.25, 0.5)
            note(47, 0.5, 0.75)
            note(51, 0.75, 1.0)
            break

        case 7: // half-bar 8
            note(63, 0.0, 1.0)
            note(54, 0.0, 0.25)
            note(66, 0.04, 1.0)
            note(71, 0.08, 1.0)
            note(75, 0.12, 1.0)
            note(51, 0.25, 0.5)
            note(47, 0.5, 0.75)
            note(42, 0.75, 1.0)
            break

        // half-bar 9 duplicates 1

        // half-bar 10 duplicates 2

        // half-bar 11 duplicates 3

        // half-bar 12 duplicates 4

        // half-bar 13 duplicates 5

        // half-bar 14 duplicates 6

        case 14: // half-bar 15
            note(64, 0.0, 2.0)
            note(40, 0.0, 0.25)
            note(67, 0.04, 2.0)
            note(71, 0.08, 2.0)
            note(76, 0.12, 2.0)
            note(47, 0.25, 0.5)
            note(52, 0.5, 0.75)
            note(55, 0.75, 1.0)
            break

        case 15: // half-bar 16
            note(64, 0.0, 0.25)
            note(59, 0.25, 0.5)
            note(55, 0.5, 0.75)
            note(52, 0.75, 1.0)
            break

        case 16: // half-bar 17
        case 24: // half-bar 25 dedup
            note(64, 0.0, 0.125)
            note(40, 0.0, 0.25)
            note(71, 0.125, 0.25)
            note(69, 0.25, 0.375)
            note(47, 0.25, 0.5)
            note(71, 0.375, 0.5)
            note(74, 0.5, 0.625)
            note(52, 0.5, 0.75)
            note(71, 0.625, 0.75)
            note(69, 0.75, 0.875)
            note(55, 0.75, 1.0)
            note(71, 0.875, 1.0)
            break

        case 17: // half-bar 18
        case 25: // half-bar 26 dedup
            note(64, 0.0, 0.125)
            note(59, 0.0, 0.25)
            note(71, 0.125, 0.25)
            note(69, 0.25, 0.375)
            note(55, 0.25, 0.5)
            note(71, 0.375, 0.5)
            note(74, 0.5, 0.625)
            note(52, 0.5, 0.75)
            note(71, 0.625, 0.75)
            note(69, 0.75, 0.875)
            note(47, 0.75, 1.0)
            note(71, 0.875, 1.0)
            break

        case 18: // half-bar 19
        case 26: // half-bar 27 dedup
            note(66, 0.0, 0.125)
            note(36, 0.0, 0.25)
            note(67, 0.125, 0.25)
            note(66, 0.25, 0.375)
            note(43, 0.25, 0.5)
            note(67, 0.375, 0.5)
            note(71, 0.5, 0.625)
            note(48, 0.5, 0.75)
            note(67, 0.625, 0.75)
            note(66, 0.75, 0.875)
            note(52, 0.75, 1.0)
            note(67, 0.875, 1.0)
            break

        case 19: // half-bar 20
        case 27: // half-bar 28 dedup
            note(66, 0.0, 0.125)
            note(55, 0.0, 0.25)
            note(67, 0.125, 0.25)
            note(66, 0.25, 0.375)
            note(52, 0.25, 0.5)
            note(67, 0.375, 0.5)
            note(71, 0.5, 0.625)
            note(48, 0.5, 0.75)
            note(67, 0.625, 0.75)
            note(66, 0.75, 0.875)
            note(43, 0.75, 1.0)
            note(67, 0.875, 1.0)
            break

        case 20: // half-bar 21
        case 28: // half-bar 29 dedup
            note(62, 0.0, 0.125)
            note(38, 0.0, 0.25)
            note(69, 0.125, 0.25)
            note(67, 0.25, 0.375)
            note(45, 0.25, 0.5)
            note(69, 0.375, 0.5)
            note(74, 0.5, 0.625)
            note(50, 0.5, 0.75)
            note(69, 0.625, 0.75)
            note(67, 0.75, 0.875)
            note(54, 0.75, 1.0)
            note(69, 0.875, 1.0)
            break

        case 21: // half-bar 22
        case 29: // half-bar 30 dedup
            note(62, 0.0, 0.125)
            note(57, 0.0, 0.25)
            note(69, 0.125, 0.25)
            note(67, 0.25, 0.375)
            note(54, 0.25, 0.5)
            note(69, 0.375, 0.5)
            note(74, 0.5, 0.625)
            note(50, 0.5, 0.75)
            note(69, 0.625, 0.75)
            note(67, 0.75, 0.875)
            note(45, 0.75, 1.0)
            note(69, 0.875, 1.0)
            break

        case 22: // half-bar 23
        case 30: // half-bar 31 dedup
            note(63, 0.0, 0.125)
            note(35, 0.0, 0.25)
            note(71, 0.125, 0.25)
            note(69, 0.25, 0.375)
            note(42, 0.25, 0.5)
            note(71, 0.375, 0.5)
            note(75, 0.5, 0.625)
            note(47, 0.5, 0.75)
            note(71, 0.625, 0.75)
            note(69, 0.75, 0.875)
            note(51, 0.75, 1.0)
            note(71, 0.875, 1.0)
            break

        case 23: // half-bar 24
            note(63, 0.0, 0.125)
            note(54, 0.0, 0.25)
            note(71, 0.125, 0.25)
            note(69, 0.25, 0.375)
            note(51, 0.25, 0.5)
            note(71, 0.375, 0.5)
            note(75, 0.5, 0.625)
            note(47, 0.5, 0.75)
            note(71, 0.625, 0.75)
            note(69, 0.75, 0.875)
            note(42, 0.75, 1.0)
            note(71, 0.875, 1.0)
            break

        // half-bar 25 duplicates 17

        // half-bar 26 duplicates 18

        // half-bar 27 duplicates 19

        // half-bar 28 duplicates 20

        // half-bar 29 duplicates 21

        // half-bar 30 duplicates 22

        // half-bar 31 duplicates 23

        case 31: // half-bar 32
            note(63, 0.0, 0.125)
            note(47, 0.0, 0.25)
            note(71, 0.125, 0.25)
            note(69, 0.25, 0.375)
            note(51, 0.25, 0.5)
            note(71, 0.375, 0.5)
            note(75, 0.5, 0.625)
            note(54, 0.5, 0.75)
            note(71, 0.625, 0.75)
            note(75, 0.75, 0.875)
            note(59, 0.75, 1.0)
            note(78, 0.875, 1.0)
            break

        case 32: // half-bar 33
        case 40: // half-bar 41 dedup
            note(64, 0.0, 0.5)
            note(40, 0.0, 0.125)
            note(67, 0.04, 0.5)
            note(71, 0.08, 0.5)
            note(76, 0.12, 0.5)
            note(47, 0.125, 0.25)
            note(52, 0.25, 0.375)
            note(55, 0.375, 0.5)
            note(71, 0.5, 1.25)
            note(67, 0.5, 1.25)
            note(59, 0.5, 0.625)
            note(55, 0.625, 0.75)
            note(52, 0.75, 0.875)
            note(47, 0.875, 1.0)
            break

        case 33: // half-bar 34
        case 41: // half-bar 42 dedup
            note(40, 0.0, 0.125)
            note(52, 0.125, 0.25)
            note(76, 0.25, 0.5)
            note(71, 0.25, 0.5)
            note(55, 0.25, 0.375)
            note(59, 0.375, 0.5)
            note(78, 0.5, 0.75)
            note(71, 0.5, 0.75)
            note(64, 0.5, 0.625)
            note(59, 0.625, 0.75)
            note(79, 0.75, 1.0)
            note(71, 0.75, 1.0)
            note(55, 0.75, 0.875)
            note(52, 0.875, 1.0)
            break

        case 34: // half-bar 35
        case 42: // half-bar 43 dedup
            note(69, 0.0, 0.5)
            note(45, 0.0, 0.125)
            note(72, 0.04, 0.5)
            note(76, 0.08, 0.5)
            note(81, 0.12, 0.5)
            note(52, 0.125, 0.25)
            note(57, 0.25, 0.375)
            note(60, 0.375, 0.5)
            note(76, 0.5, 1.25)
            note(72, 0.5, 1.25)
            note(64, 0.5, 0.625)
            note(60, 0.625, 0.75)
            note(57, 0.75, 0.875)
            note(52, 0.875, 1.0)
            break

        case 35: // half-bar 36
        case 43: // half-bar 44 dedup
            note(45, 0.0, 0.125)
            note(57, 0.125, 0.25)
            note(81, 0.25, 0.5)
            note(76, 0.25, 0.5)
            note(60, 0.25, 0.375)
            note(64, 0.375, 0.5)
            note(83, 0.5, 0.75)
            note(76, 0.5, 0.75)
            note(69, 0.5, 0.625)
            note(64, 0.625, 0.75)
            note(86, 0.75, 1.0)
            note(78, 0.75, 1.0)
            note(60, 0.75, 0.875)
            note(57, 0.875, 1.0)
            break

        case 36: // half-bar 37
        case 44: // half-bar 45 dedup
            note(69, 0.0, 0.75)
            note(50, 0.0, 0.125)
            note(74, 0.04, 0.75)
            note(78, 0.08, 0.75)
            note(81, 0.12, 0.75)
            note(54, 0.125, 0.25)
            note(57, 0.25, 0.375)
            note(62, 0.375, 0.5)
            note(66, 0.5, 0.625)
            note(62, 0.625, 0.75)
            note(79, 0.75, 1.0)
            note(57, 0.75, 0.875)
            note(50, 0.875, 1.0)
            break

        case 37: // half-bar 38
        case 45: // half-bar 46 dedup
            note(78, 0.0, 0.25)
            note(74, 0.0, 0.25)
            note(38, 0.0, 0.125)
            note(45, 0.125, 0.25)
            note(79, 0.25, 0.375)
            note(50, 0.25, 0.375)
            note(78, 0.375, 0.625)
            note(54, 0.375, 0.5)
            note(57, 0.5, 0.625)
            note(74, 0.625, 1.0)
            note(54, 0.625, 0.75)
            note(50, 0.75, 0.875)
            note(45, 0.875, 1.0)
            break

        case 38: // half-bar 39
            note(59, 0.0, 1.0)
            note(35, 0.0, 0.125)
            note(63, 0.04, 1.0)
            note(66, 0.08, 1.0)
            note(71, 0.12, 1.0)
            note(42, 0.125, 0.25)
            note(47, 0.25, 0.375)
            note(51, 0.375, 0.5)
            note(54, 0.5, 0.625)
            note(51, 0.625, 0.75)
            note(47, 0.75, 0.875)
            note(42, 0.875, 1.0)
            break

        case 39: // half-bar 40
            note(63, 0.0, 1.0)
            note(47, 0.0, 0.125)
            note(66, 0.04, 1.0)
            note(71, 0.08, 1.0)
            note(75, 0.12, 1.0)
            note(51, 0.125, 0.25)
            note(54, 0.25, 0.375)
            note(59, 0.375, 0.5)
            note(63, 0.5, 0.625)
            note(59, 0.625, 0.75)
            note(54, 0.75, 0.875)
            note(51, 0.875, 1.0)
            break

        // half-bar 41 duplicates 33

        // half-bar 42 duplicates 34

        // half-bar 43 duplicates 35

        // half-bar 44 duplicates 36

        // half-bar 45 duplicates 37

        // half-bar 46 duplicates 38

        case 46: // half-bar 47
            note(64, 0.0, 2.0)
            note(40, 0.0, 0.125)
            note(67, 0.04, 2.0)
            note(71, 0.08, 2.0)
            note(76, 0.12, 2.0)
            note(47, 0.125, 0.25)
            note(52, 0.25, 0.375)
            note(55, 0.375, 0.5)
            note(59, 0.5, 0.625)
            note(55, 0.625, 0.75)
            note(52, 0.75, 0.875)
            note(47, 0.875, 1.0)
            break

        case 47: // half-bar 48
            note(40, 0.0, 0.125)
            note(52, 0.125, 0.25)
            note(55, 0.25, 0.375)
            note(59, 0.375, 0.5)
            note(64, 0.5, 0.625)
            note(67, 0.625, 0.75)
            note(71, 0.75, 0.875)
            note(76, 0.875, 1.0)
            break

        case 48: // half-bar 49
            note(79, 0.0, 1.0)
            note(76, 0.0, 1.0)
            note(64, 0.0, 0.125)
            note(67, 0.125, 0.25)
            note(71, 0.25, 0.375)
            note(67, 0.375, 0.5)
            note(71, 0.5, 1.0)
            break

        case 49: // half-bar 50
            note(78, 0.0, 0.5)
            note(74, 0.0, 0.5)
            note(62, 0.0, 0.25)
            note(69, 0.25, 0.5)
            note(81, 0.5, 0.75)
            note(74, 0.5, 1.0)
            note(86, 0.75, 1.0)
            break

        case 50: // half-bar 51
            note(88, 0.0, 2.0)
            note(84, 0.0, 2.0)
            note(67, 0.0, 1.5)
            note(60, 0.0, 1.5)
            break

        case 51: // half-bar 52
            note(60, 0.5, 0.75)
            note(67, 0.75, 1.0)
            break

        case 52: // half-bar 53
            note(91, 0.0, 1.0)
            note(88, 0.0, 1.0)
            note(83, 0.0, 1.0)
            note(79, 0.0, 0.25)
            note(76, 0.25, 0.5)
            note(71, 0.5, 0.75)
            note(67, 0.75, 1.0)
            break

        case 53: // half-bar 54
            note(81, 0.0, 0.3125)
            note(62, 0.0, 1.0)
            note(86, 0.04, 0.3125)
            note(90, 0.08, 0.3125)
            note(86, 0.3125, 0.625)
            note(81, 0.625, 0.9375)
            note(86, 0.9375, 1.25)
            break

        case 54: // half-bar 55
            note(64, 0.25, 2.0)
            note(71, 0.29, 2.0)
            note(76, 0.33, 2.0)
            note(79, 0.37, 2.0)
            note(83, 0.41, 2.0)
            note(88, 0.45, 2.0)
            break
    }
}

// Unconstrained by the limitations of js13k and web audio,
// you should really listen to this other version of the song:
// https://youtu.be/gQKo2O8z34c
