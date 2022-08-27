import { Modes } from "../../Modes/Modes";
import { SelectorAttribute, SelectorAttributes, SelectorData } from "./SelectorData";

/**
 * The class that represents a selector.
 */
export class Selector {
  /**
   * @example '@a' | '@e'
   */
  public type: string;
  /**
   * 
   */
  public data: SelectorData;

  constructor(type?: string, data?: SelectorData) {
    this.type = type || "a";
    this.data = data || {};
  }

  get(attribute: SelectorAttributes): SelectorAttribute[] {
    let values = this.data[attribute];

    if (!values) {
      values = [];
      this.data[attribute] = values;
    }

    return values;
  }

  count(attribute: SelectorAttributes): number {
    return this.get(attribute)?.length || 0;
  }
}

/**
 * The namespace for the `Selector` class.
 */
export namespace Selector {
  /**
   * Returns
   * @param type
   * @returns
   */
  export function isValidType(type: string | Selector): boolean {
    if (typeof type !== "string") {
      type = type.type;
    }

    return Modes.SelectorType.isValue(type);
  }
}
