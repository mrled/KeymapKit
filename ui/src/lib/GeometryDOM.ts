import { Point } from "@keymapkit/models";

/* Return a new rect inside the input rect
 */
export const smallerRect = (rect: DOMRect, offset: number = 5) => {
  const newRect = DOMRect.fromRect(rect);
  newRect.x += offset;
  newRect.width -= 2 * offset;
  newRect.y += offset;
  newRect.height -= 2 * offset;
  return newRect;
};

/* Trace a rect
 * rect:    An existing DOMRect
 * context: Ah HTML canvas context
 */
export const traceRect = (rect: DOMRect, context: CanvasRenderingContext2D) => {
  context.moveTo(rect.left, rect.top);
  context.lineTo(rect.left, rect.bottom);
  context.lineTo(rect.right, rect.bottom);
  context.lineTo(rect.right, rect.top);
  context.lineTo(rect.left, rect.top);
};

export function pointFromDOMRect(rect: DOMRect): Point {
  return new Point(rect.x, rect.y);
}
