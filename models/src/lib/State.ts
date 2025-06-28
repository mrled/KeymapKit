/* State interfaces
 */

/* Metadata that can be attached to a state change
 */
export interface StateChangeMetadata {
  isUserInitiated?: boolean;
}

/* A single state change
 */
export class StateChange<T> {
  constructor(
    public key: keyof T,
    public oldValue: T[keyof T] | null,
    public newValue: T[keyof T],
    public metadata: StateChangeMetadata = {},
  ) {}

  toString() {
    const keyStr = String(this.key);
    const oldValStr = this.oldValue === "null" ? "null" : String(this.oldValue);
    return `StateChange(${keyStr}, ${oldValStr}, ${this.newValue})`;
  }
}

/* A map of key:StateChange pairs
 */
export class StateChangeMap<T> extends Map<keyof T, StateChange<T>> {}

/* A state observer interface
 *
 * The state observer is responsible for updating its view when the state changes.
 */
export interface IStateObserver<T> {
  // A name for the observer, used for logging and debugging
  observerName: string;
  update(stateChanges: StateChangeMap<T>): void;
}
