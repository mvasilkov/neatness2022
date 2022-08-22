#!/usr/bin/env python3

from pathlib import Path

from PIL import Image

OUR_ROOT = Path(__file__).parents[1].resolve()


def crop_to_content(buf):
    pass


def as_typescript(buf):
    result = []
    for line in buf:
        assert len(line) <= 53
        result.append('    0b' + ''.join([str(value) for value in line]) + ',\n')
    return 'const tiles = [\n' + ''.join(result) + ']\n'


def run():
    for png_file in (OUR_ROOT / 'level_editor').glob('*.png'):
        print(png_file.name)
        p = Image.open(png_file)
        width, height = p.size

        buf = [[0 if p.getpixel((x, y)) == (0, 0, 0) else 1 for x in range(width)] for y in range(height)]
        buf = crop_to_content(buf)
        print(as_typescript(buf))


if __name__ == '__main__':
    run()
