#!/usr/bin/env python3

from pathlib import Path

from PIL import Image

OUR_ROOT = Path(__file__).parents[1].resolve()

SCRIPT = '''export const tiles = [
%s
]
export const width = %d
'''


def crop_to_content(buf):
    while sum(buf[0]) == 0:
        buf = buf[1:]
    while sum(buf[-1]) == 0:
        buf.pop()

    a = 0
    while sum(line[a] for line in buf) == 0:
        a += 1
    b = len(buf[0])
    while sum(line[b - 1] for line in buf) == 0:
        b -= 1

    return [line[a:b] for line in buf]


def as_typescript(buf):
    result = []
    for line in buf:
        assert len(line) <= 53
        result.append('    0b' + ''.join([str(value) for value in line]) + ',')
    return SCRIPT % ('\n'.join(result), len(buf[0]))


def run():
    for png_file in (OUR_ROOT / 'level_editor').glob('*.png'):
        print(png_file.name)
        p = Image.open(png_file)
        width, height = p.size

        buf = [[0 if p.getpixel((x, y)) == (0, 0, 0) else 1 for x in range(width)] for y in range(height)]
        buf = crop_to_content(buf)

        out = OUR_ROOT / 'typescript' / 'levels' / 'tiles' / png_file.name
        out = out.with_suffix('.ts')
        out.write_text(as_typescript(buf), encoding='utf-8', newline='\n')


if __name__ == '__main__':
    run()
