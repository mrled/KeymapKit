# @keymapkit/keyboard.ergodox

A keyboard module for the [KeymapKit](https://github.com/mrled/KeymapKit) project.

![Screenshot](screenshot.png?raw=true "Screenshot")

This module defines an ErgoDox keyboard.

- Default key size: 2x2
- Maximum key size: 4x3

The keyboard has four keygrids:

- `l-f`: Left finger grid
- `l-t`: Left thumb grid
- `r-f`: Right finger grid
- `r-t`: Right thumb grid

All key IDs follow the pattern `{keygrid}-{x}-{y}` where keygrid is one of the four grids above, and x and y are the coordinates.

## Left Finger Grid (l-f)

Row 1 (number row):

- l-f-1-1
- l-f-4-1
- l-f-6-1
- l-f-8-1
- l-f-10-1
- l-f-12-1
- l-f-14-1

Row 2 (qwerty row):

- l-f-1-3
- l-f-4-3
- l-f-6-3
- l-f-8-3
- l-f-10-3
- l-f-12-3
- l-f-14-3

Row 3 (asdf row):

- l-f-1-5
- l-f-4-5
- l-f-6-5
- l-f-8-5
- l-f-10-5
- l-f-12-5
- l-f-14-6

Row 4 (zxcv row):

- l-f-1-7
- l-f-4-7
- l-f-6-7
- l-f-8-7
- l-f-10-7
- l-f-12-7

Row 5 (bottom row):

- l-f-2-9
- l-f-4-9
- l-f-6-9
- l-f-8-9
- l-f-10-9

## Left Thumb Grid (l-t)

The left thumb grid uses a special layout,
where keys A, B, E, and F are 2x2-sized keys,
and C and D are 2x4 sized keys.

```text
      0 2 4
    +------+
  0 |   A B
  2 | C D E
  4 | C D F
```

Keys:

- l-t-3-1 (A)
- l-t-5-1 (B)
- l-t-1-3 (C - 2x4 size)
- l-t-3-3 (D - 2x4 size)
- l-t-5-3 (E)
- l-t-5-5 (F)

## Right Finger Grid (r-f)

Row 1 (number row):

- r-f-1-1
- r-f-3-1
- r-f-5-1
- r-f-7-1
- r-f-9-1
- r-f-11-1
- r-f-13-1

Row 2 (qwerty row):

- r-f-1-3
- r-f-3-3
- r-f-5-3
- r-f-7-3
- r-f-9-3
- r-f-11-3
- r-f-13-3

Row 3 (asdf row):

- r-f-1-6
- r-f-3-5
- r-f-5-5
- r-f-7-5
- r-f-9-5
- r-f-11-5
- r-f-13-5

Row 4 (zxcv row):

- r-f-3-7
- r-f-5-7
- r-f-7-7
- r-f-9-7
- r-f-11-7
- r-f-13-7

Row 5 (bottom row):

- r-f-5-9
- r-f-7-9
- r-f-9-9
- r-f-11-9
- r-f-13-9

## Right Thumb Grid (r-t)

The right thumb grid uses a special layout
which is a mirror of the l-t grid,
with the two 2x4-sized keys on the right.

```text
      0 2 4
    +------+
  0 | A B
  2 | C D E
  4 | F D E
```

Keys:

- r-t-1-1 (A)
- r-t-3-1 (B)
- r-t-1-3 (C)
- r-t-3-3 (D - 2x4 size)
- r-t-5-3 (E - 2x4 size)
- r-t-1-5 (F)
