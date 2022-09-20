import { Attribute } from "./Attribute";

/** The keys of the hasItem attribute*/
export type HasItemAttribute = keyof HasItemSet<never>;

/**
 *
 */
export interface HasItemSet<T> {
  /** The data value of the selector */
  data?: T;
  /** The item identification*/
  item?: T;
  /** The amount of items */
  quantity?: T;
  /** The slot location of the item */
  location?: T;
  /** The slot number of the item */
  slot?: T;
}

/**
 *
 */
export type HasItemData = HasItemSet<Array<Attribute<HasItemData>>>;

export namespace HasItemData {
  export function is(value: any): value is HasItemData {
    if (typeof value !== "object") {
      return false;
    }

    const attributes = Object.getOwnPropertyNames(value);

    for (const attribute of attributes) {
      switch (attribute) {
        case "data":
        case "item":
        case "quantity":
        case "location":
        case "slot":
          break;
        default:
          return false;
      }
    }

    return true;
  }

  export function isArray(value: any): value is HasItemData[] {
    if (typeof value !== "object") {
      return false;
    }
    if (!Array.isArray(value)) {
      return false;
    }

    for (const item of value) {
      if (!HasItemData.is(item)) {
        return false;
      }
    }

    return true;
  }
}
