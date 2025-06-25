# @keymapkit/keyboard.advantage360

A keyboard module for the [KeymapKit](https://github.com/mrled/KeymapKit) project.

![Screenshot](screenshot.png?raw=true "Screenshot")

This module defines a Kinesis Advantage360 keyboard.

- Default key size: 4x4
- Maximum key size: 4x8

The keyboard has four keygrids:

- `l-f`: Left finger grid
- `l-t`: Left thumb grid
- `r-f`: Right finger grid
- `r-t`: Right thumb grid

All key IDs follow the pattern `{keygrid}-{x}-{y}` where keygrid is one of the four grids above, and x and y are the coordinates.

## Left Finger Grid (l-f)

Row 1 (number row):

- l-f-1-1
- l-f-6-1
- l-f-10-1
- l-f-14-1
- l-f-18-1
- l-f-22-1
- l-f-26-1

Row 2 (qwerty row):

- l-f-1-5
- l-f-6-5
- l-f-10-5
- l-f-14-5
- l-f-18-5
- l-f-22-5
- l-f-26-5

Row 3 (asdf row):

- l-f-1-9
- l-f-6-9
- l-f-10-9
- l-f-14-9
- l-f-18-9
- l-f-22-9
- l-f-26-9

Row 4 (zxcv row):

- l-f-1-13
- l-f-6-13
- l-f-10-13
- l-f-14-13
- l-f-18-13
- l-f-22-13

Row 5 (bottom row):

- l-f-1-17
- l-f-6-17
- l-f-10-17
- l-f-14-17
- l-f-18-17

## Left Thumb Grid (l-t)

The left thumb grid uses a special layout,
where keys A, B, E, and F are 4x4-sized keys,
and C and D are 4x8 sized keys.

```text
      1 5 9
    +------+
  1 |   A B
  5 | C D E
  9 | C D F
```

Keys:

- l-t-5-1 (A)
- l-t-9-1 (B)
- l-t-1-5 (C - 4x8 size)
- l-t-5-5 (D - 4x8 size)
- l-t-9-5 (E)
- l-t-9-9 (F)

## Right Finger Grid (r-f)

Row 1 (number row):

- r-f-1-1
- r-f-5-1
- r-f-9-1
- r-f-13-1
- r-f-17-1
- r-f-21-1
- r-f-25-1

Row 2 (qwerty row):

- r-f-1-5
- r-f-5-5
- r-f-9-5
- r-f-13-5
- r-f-17-5
- r-f-21-5
- r-f-25-5

Row 3 (asdf row):

- r-f-1-9
- r-f-5-9
- r-f-9-9
- r-f-13-9
- r-f-17-9
- r-f-21-9
- r-f-25-9

Row 4 (zxcv row):

- r-f-5-13
- r-f-9-13
- r-f-13-13
- r-f-17-13
- r-f-21-13
- r-f-25-13

Row 5 (bottom row):

- r-f-9-17
- r-f-13-17
- r-f-17-17
- r-f-21-17
- r-f-25-17

## Right Thumb Grid (r-t)

The right thumb grid uses a special layout
which is a mirror of the l-t grid,
with the two 4x8-sized keys on the right.

```text
      1 5 9
    +------+
  1 | A B
  5 | C D E
  9 | F D E
```

Keys:

- r-t-1-1 (A)
- r-t-5-1 (B)
- r-t-1-5 (C)
- r-t-5-5 (D - 4x8 size)
- r-t-9-5 (E - 4x8 size)
- r-t-1-9 (F)
