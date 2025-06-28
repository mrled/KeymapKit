import { Point, Size } from "./Geometry.js";

/* A physical key on a keyboard.
 *
 * boardId:     A keyboard-specific identifier.
 *              Keyboards with just one sub-board or grid might have just one.
 *              Keyboards with multiple distinct areas like an ErgoDox might have two or more.
 * position:    The position on the board.
 *              Unique for each boardId.
 *              Positions are given in key grid units,
 *              so keyboards which use 2x2 units will have X and Y coordinates as multiples of 2.
 * size:        The size of the key, in key grid units.
 *
 * TODO: We need a different name for these key grid units; these aren't like 1rem, but like 1x or 2x.
 */
export class PhysicalKey {
  constructor(
    readonly boardId: string,
    readonly position: Point,
    readonly size: Size,
  ) {}

  get id() {
    return `${this.boardId}-${this.position.x}-${this.position.y}`;
  }

  /* Return a string for the position attribute of a keyboad-key element.
   */
  get positionAttribute() {
    return `${this.size.x} ${this.size.y} ${this.position.x} ${this.position.y}`;
  }
}
