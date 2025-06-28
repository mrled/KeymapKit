/* A simple point
 */
export class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x || 0;
    this.y = y || 0;
  }
}

/* A simple size
 */
export class Size extends Point {}
