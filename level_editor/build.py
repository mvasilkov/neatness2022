#!/usr/bin/env python3

from math import floor
from pathlib import Path

from PIL import Image

OUR_ROOT = Path(__file__).parents[1].resolve()

SCRIPT = '''export const tiles = [
%s
]
export const width = %d
'''

IR_SCREEN_WIDTH = 420
IR_SCREEN_HEIGHT = 270

TILE_WIDTH = 7
TILE_HEIGHT = 8


def crop_to_content(buf):
    top = 0
    while sum(buf[0]) == 0:
        buf = buf[1:]
        top += 1
    while sum(buf[-1]) == 0:
        buf.pop()

    a = 0
    while sum(line[a] for line in buf) == 0:
        a += 1
    b = len(buf[0])
    while sum(line[b - 1] for line in buf) == 0:
        b -= 1

    return ([line[a:b] for line in buf], a, top)


def as_typescript(buf, save_points):
    result = []
    for line in buf:
        assert len(line) <= 53
        result.append('    0b' + ''.join([str(value) for value in line]) + ',')

    script = SCRIPT % ('\n'.join(result), len(buf[0]))

    if save_points:
        xs = [x for x, _ in save_points]
        ys = [y for _, y in save_points]
        script += f'export const xs = {xs!r}\nexport const ys = {ys!r}\n'

    return script


def run():
    for png_file in (OUR_ROOT / 'level_editor').glob('*.png'):
        print(png_file.name)
        p = Image.open(png_file)
        width, height = p.size

        save_points = [(x, y) for y in range(height) for x in range(width) if p.getpixel((x, y)) == (255, 0, 128)]

        buf = [
            [0 if p.getpixel((x, y)) in ((0, 0, 0), (255, 0, 128)) else 1 for x in range(width)] for y in range(height)
        ]
        buf, left, top = crop_to_content(buf)

        width = len(buf[0])
        height = len(buf)

        x0 = floor(0.5 * (IR_SCREEN_WIDTH - TILE_WIDTH * width))
        y0 = floor(0.5 * (IR_SCREEN_HEIGHT - TILE_HEIGHT * height))

        save_points = [(x0 + TILE_WIDTH * (x - left), y0 + TILE_HEIGHT * (y - top)) for x, y in save_points]

        out = OUR_ROOT / 'typescript' / 'levels' / 'tiles' / png_file.name
        out = out.with_suffix('.ts')
        out.write_text(as_typescript(buf, save_points), encoding='utf-8', newline='\n')


if __name__ == '__main__':
    run()
